"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
// import { Cors } from "cors"
const app = (0, express_1.default)();
// app.use(Cors)
const port = 3000;
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*"
    },
});
const rooms = new Map();
io.on("connection", (socket) => {
    let joinedRoom = "";
    let playerColor = "w";
    socket.on('startGame', (roomData) => {
        if ((roomData === null || roomData === void 0 ? void 0 : roomData.type) === 'create') {
            // console.log("created----", roomData);
            joinedRoom = `${roomData === null || roomData === void 0 ? void 0 : roomData.roomName}`;
            const players = [{ color: roomData === null || roomData === void 0 ? void 0 : roomData.selectedColor, id: socket.id }];
            rooms.set(joinedRoom, players);
            console.log(`Player1 ${socket.id} joined room ${joinedRoom} as ${playerColor}---1`);
            playerColor = (roomData === null || roomData === void 0 ? void 0 : roomData.selectedColor) === "w" ? "b" : "w";
            socket.join(joinedRoom);
            socket.emit("joinedAs", { playerColor });
        }
        if ((roomData === null || roomData === void 0 ? void 0 : roomData.type) === 'join') {
            joinedRoom = `${roomData === null || roomData === void 0 ? void 0 : roomData.roomName}`;
            const players = rooms.get(joinedRoom) || [];
            const playerCount = players.length;
            playerColor = playerCount % 2 === 0 ? 'w' : 'b';
            players.push({ color: playerColor, id: socket.id });
            rooms.set(joinedRoom, players);
            console.log(`Player2 ${socket.id} joined room ${joinedRoom} as ${playerColor}----2`);
            socket.join(joinedRoom);
            socket.emit("joinedAs", { playerColor });
        }
        const players = rooms.get(joinedRoom);
        if ((players === null || players === void 0 ? void 0 : players.length) === 2) {
            io.to(joinedRoom).emit("start");
        }
    });
    // for (const [roomId, players] of rooms.entries()) {
    //     if (players.length === 1) {
    //         joinedRoom = roomId;
    //         playerColor = players[0].color === "w" ? "b" : "w";
    //         players.push({ color: playerColor, id: socket.id });
    //         break;
    //     }
    // }
    // if (!joinedRoom) {
    //     joinedRoom = `room-${rooms.size + 1}`;
    //     rooms.set(joinedRoom, [{ color: 'w', id: socket.id }]);
    // }
    // socket.join(joinedRoom);
    // console.log(`Client ${socket.id} joined room ${joinedRoom} as ${playerColor}`);
    // socket.emit("joinedRoom", {
    //     playerColor: playerColor,
    //     room: joinedRoom,
    //     players: rooms.get(joinedRoom)
    // });
    socket.on("move", (moveData) => {
        socket.to(joinedRoom).emit("move", { playerColor: playerColor, playedMove: moveData });
    });
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        const players = rooms.get(joinedRoom);
        if (players) {
            // players.splice(players.indexOf(socket.id), 1);
            delete players[socket.id];
            if (players.length === 0) {
                rooms.delete(joinedRoom);
            }
        }
    });
});
app.get("/", (req, res) => {
    res.send("OK 👍");
});
httpServer.listen(port, () => console.log(`Port: ${port} Server active...`));
