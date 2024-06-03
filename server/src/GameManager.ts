import { Socket } from "socket.io";
import Container, { Service } from "typedi";
import { Player, Room, RoomType, TRoomData } from "./types/game";
import { Game } from "./Game";
import { Chess } from "chess.js";

@Service()
export class GameManager {
    private rooms: Map<string, Room> = new Map();
    private game: Game;

    constructor() {
        this.game = Container.get(Game)
    }

    public startGame(roomData: TRoomData, socket: Socket, io: any): void {
        if (roomData?.type === RoomType.CREATE) {
            this.handleRoomAction(roomData, socket, RoomType.CREATE);
        } else if (roomData?.type === RoomType.JOIN) {
            this.handleRoomAction(roomData, socket, RoomType.JOIN);
        }

        const players: any = this.rooms.get(roomData.roomName)?.players;
        if (players?.length === 2) {
            io.to(roomData.roomName).emit("start", {
                player1: { socketId: players[0].id },
                player2: { socketId: players[1].id }
            });
        } else {
            socket.emit("roomFull");
            return;
        }
    }

    private handleRoomAction(roomData: TRoomData, socket: Socket, action: RoomType.CREATE | RoomType.JOIN): void {
        const roomName = roomData?.roomName;
        const canJoinRoom = action === RoomType.JOIN ? this.rooms.has(roomName) : true;

        socket.emit("roomNotFound", { canJoinRoom });

        if (!canJoinRoom) return;

        let room = this.rooms.get(roomName);
        if (!room) {
            room = { players: [] };
        }

        const players = room.players || [];

        if (action === RoomType.CREATE || players.length === 0) {
            this.createRoom(roomData, socket, players);
        } else if (action === RoomType.JOIN && players.length === 1) {
            this.joinRoom(roomData, socket, players);
        }
    }

    private createRoom(roomData: TRoomData, socket: Socket, players: Player[]): void {
        const firstPlayerColor = roomData.selectedColor ? roomData.selectedColor : "w";
        const secondPlayerColor = firstPlayerColor === "w" ? "b" : "w";
        const roomName = roomData.roomName;
        this.game.player1 = socket;

        const player: Player = { id: socket.id, color: firstPlayerColor };
        players.push(player);

        const room: Room = { players };

        this.rooms.set(roomName, room);

        socket.join(roomName);
        socket.emit(`joinedAs`, { orientation: firstPlayerColor });
    }

    private joinRoom(roomData: TRoomData, socket: Socket, players: Player[]): void {
        const roomName = roomData.roomName;
        const firstPlayer = players[0];
        const secondPlayerColor = firstPlayer.color === "w" ? "b" : "w";
        this.game.player2 = socket;

        const player: Player = { id: socket.id, color: secondPlayerColor };
        players.push(player);

        const room: Room = { players };

        this.rooms.set(roomName, room);

        socket.join(roomName);
        socket.emit(`joinedAs`, { orientation: secondPlayerColor });
    }

    public makeMove(moveData, socket) {
        const roomFound = this.getRoomNameBySocketId(socket.id);

        if (!roomFound) {
            console.error(`room not found for player ${socket.id}`);
            return;
        }
        const data: any = this.game.makeMove(moveData);
        socket.to(roomFound).emit("move", data);
        console.log(`player ${socket.id} moved ${moveData.move.from} to ${moveData.move.to} in room ${roomFound}`);
    }

    private getRoomNameBySocketId(socketId: string): string | undefined {
        return Array.from(this.rooms.entries())
            .find(([roomName, room]) => room.players.some(player => player.id === socketId))?.[0];
    }

    public playerChat(message, socket) {
        const roomFound = this.getRoomNameBySocketId(socket.id);
        if (roomFound) {
            socket.to(roomFound).emit('chat', { ...message, type: 'received', player: socket.id, time: Date.now() });
        }
    }

    public playerDisconnected(socket) {
        const roomFound = this.getRoomNameBySocketId(socket.id);
        if (roomFound) {
            socket.to(roomFound).emit("playerLeft", { playerId: socket.id });
        }
        const room: any = this.rooms.get(roomFound);
        if (room) {
            this.rooms.delete(roomFound);
        }
    }

    public playerVideoCall(data, io: any, socket) {
        const roomFound = this.getRoomNameBySocketId(socket.id);
        console.log(socket.id, roomFound, "videocalldata----", data)
        // io.to(roomFound).emit("new_peer", { peerId: data.peerId, socketId: data.socketId, room: roomFound })
        socket.broadcast.to(roomFound).emit("new_peer", { peerId: data.peerId, socketId: data.socketId, room: roomFound })
    }
}


