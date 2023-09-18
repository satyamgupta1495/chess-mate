"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
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
    let playerColor = 'w';
    //save session of current user in socket
    let playerData = {
        id: socket.id,
        room: '',
        color: '',
        type: ''
    };
    socket.on('startGame', (roomData) => {
        console.log("roomData", roomData);
        let player1Color = "";
        let player2Color = "";
        if ((roomData === null || roomData === void 0 ? void 0 : roomData.type) === 'create') {
            console.log("created----", roomData);
            player1Color = roomData.selectedColor ? roomData.selectedColor : "w";
            player2Color = player1Color === "w" ? "b" : "w";
            playerColor = player1Color;
            joinedRoom = `${roomData === null || roomData === void 0 ? void 0 : roomData.roomName}`;
            const players = [{ color: player1Color, id: socket.id }];
            rooms.set(joinedRoom, players);
            console.log(`Player 1 with socket ID ${socket.id} joined room ${joinedRoom} as ${player1Color}.`);
            socket.join(joinedRoom);
            socket.emit(`joinedAs`, { orientation: player1Color });
            //save player data
            playerData.id = socket.id;
            playerData.room = joinedRoom;
            playerData.color = player1Color;
            playerData.type = 'create';
            socket.emit('saveSession', { player1Data: playerData });
            console.log(player1Color, '--42--', "joinedAs");
        }
        if ((roomData === null || roomData === void 0 ? void 0 : roomData.type) === 'join') {
            const canJoinRoom = rooms.has(roomData === null || roomData === void 0 ? void 0 : roomData.roomName);
            console.log("canJoinRoom", canJoinRoom);
            if (!canJoinRoom) {
                socket.emit("roomNotFound", { canJoinRoom: canJoinRoom });
                return;
            }
            joinedRoom = `${roomData === null || roomData === void 0 ? void 0 : roomData.roomName}`;
            const players = rooms.get(joinedRoom) || [];
            player2Color = 'b';
            if (players.length === 1) {
                player2Color = players[0].color === "w" ? "b" : "w";
            }
            players.push({ color: player2Color, id: socket.id });
            rooms.set(joinedRoom, players);
            console.log(`Player 2 with socket ID ${socket.id} joined room ${joinedRoom} as ${player2Color}.`);
            socket.join(joinedRoom);
            socket.emit(`joinedAs`, { orientation: player2Color });
            console.log('joinedas---', player2Color);
            playerData.id = socket.id;
            playerData.room = joinedRoom;
            playerData.color = player2Color;
            playerData.type = 'join';
            socket.emit('saveSession', { player2Data: playerData });
        }
        socket.on('reconnect', (data) => {
            console.log('reconnect----', data);
            socket.join(data === null || data === void 0 ? void 0 : data.room);
            socket.emit(`joinedAs`, { orientation: data === null || data === void 0 ? void 0 : data.color });
        });
        const players = rooms.get(joinedRoom);
        if ((players === null || players === void 0 ? void 0 : players.length) === 2) {
            io.to(joinedRoom).emit("start");
        }
        else {
            socket.emit("roomFull");
            return;
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
    socket.on('chat', (message) => {
        var _a;
        let player = (_a = rooms.get(joinedRoom)) === null || _a === void 0 ? void 0 : _a.find((player) => player.id === socket.id);
        if (player) {
            socket.to(joinedRoom).emit('chat', Object.assign(Object.assign({}, message), { type: 'received', player: socket.id, time: Date.now() }));
        }
    });
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        const players = rooms.get(joinedRoom);
        if (players) {
            const playerId = players;
            // delete players[socket.id];
            console.log("Player left", playerId);
            socket.to(joinedRoom).emit("playerLeft", { playerId });
            // if (Object.keys(players).length === 0) {
            //     rooms.delete(joinedRoom);
            //     console.log("Room deleted");
            // }
        }
    });
});
app.get("/", (req, res) => {
    res.send("OK 👍");
});
httpServer.listen(port, () => console.log(`Port: ${port} Server active...`));
