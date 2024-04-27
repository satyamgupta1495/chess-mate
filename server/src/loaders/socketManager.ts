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
                console.log("roomData", roomData)
                try {
                    this.gameManager?.startGame(roomData, socket, this.io);
                } catch (error) {
                    console.error('Error starting game:', error);
                    socket.emit('error', 'Failed to start game');
                }
            })

            socket.on('move', (moveData: any) => {
                try {
                    console.log("moveData", moveData)
                    this.gameManager.makeMove(moveData, socket)
                } catch (error) {
                    console.error('Error starting game:', error);
                    socket.emit('error', 'Failed to start game');
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

            socket.on('disconnect', () => {
                console.log(`Socket disconnected: ${socket.id}`);
            });
        });
    }
}

export default SocketManager;
