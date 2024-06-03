import Container, { Service, Inject } from "typedi";
import { Server as HTTPServer } from "http";
import { Server, Socket } from "socket.io";
import { GameManager } from "../GameManager";
import { TRoomData } from "../types/game";

@Service()
class SocketManager {
    private io: Server;
    private static instance: SocketManager;

    private gameManager = Container.get(GameManager);

    constructor(httpServer: HTTPServer) {
        this.io = new Server(httpServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
            },
        });
    }

    public setupSocketEventHandlers(): void {
        this.io.on("connection", (socket: Socket) => {
            console.log(`New socket connection: ${socket.id}`);

            socket.on('startGame', (roomData: TRoomData) => {
                try {
                    this.gameManager?.startGame(roomData, socket, this.io);
                } catch (error) {
                    console.error('Error starting game:', error);
                    socket.emit('error', 'Failed to start game');
                }
            })

            socket.on('move', (moveData: any) => {
                try {
                    this.gameManager.makeMove(moveData, socket)
                } catch (error) {
                    console.error('Invalid move', error);
                    socket.emit('error', 'Invalid move');
                }
            })

            socket.on('chat', (message) => {
                try {
                    this.gameManager.playerChat(message, socket)
                } catch (error) {
                    console.error('Failed to deliver message:', error);
                    socket.emit('error', 'Failed to deliver message');
                }
            })

            socket.on("disconnect", () => {
                try {
                    this.gameManager.playerDisconnected(socket)
                } catch (error) {
                    console.error(error);
                    socket.emit('error', 'Failed to disconnec user');
                }
            });

            socket.on("new_peer", (data) => {
                try {
                    this.gameManager.playerVideoCall(data, socket)
                } catch (error) {
                    console.error(error);
                }
            });

        });
    }
}

export default SocketManager;
