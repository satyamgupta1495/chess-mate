import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const app = express();

const port = 3000;
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*"
    },
});

const rooms = new Map();

io.on("connection", (socket: Socket) => {

    let joinedRoom: string | string[] = "";
    let playerColor: string = 'w';


    socket.on('startGame', (roomData: any) => {
        console.log("roomData", roomData);
        let player1Color = "";
        let player2Color = "";

        if (roomData?.type === 'create') {
            console.log("created----", roomData);

            player1Color = roomData.selectedColor ? roomData.selectedColor : "w";
            player2Color = player1Color === "w" ? "b" : "w";
            playerColor = player1Color;

            joinedRoom = `${roomData?.roomName}`;
            const players = [{ color: player1Color, id: socket.id }];
            rooms.set(joinedRoom, players);

            console.log(`Player 1 with socket ID ${socket.id} joined room ${joinedRoom} as ${player1Color}.`);
            socket.join(joinedRoom);
            socket.emit(`joinedAs${player1Color}`, { player1Color })
            console.log(player1Color, '--42--', player2Color)
        }

        if (roomData?.type === 'join') {
            joinedRoom = `${roomData?.roomName}`;
            const players = rooms.get(joinedRoom) || [];

            player2Color = 'b';
            if (players.length === 1) {
                player2Color = players[0].color === "w" ? "b" : "w";
            }

            players.push({ color: player2Color, id: socket.id });
            rooms.set(joinedRoom, players);
            console.log(`Player 2 with socket ID ${socket.id} joined room ${joinedRoom} as ${player2Color}.`);
            socket.join(joinedRoom);
            socket.emit(`joinedAs${player2Color}`, { player2Color })

        }
        // console.log("rooms", rooms);

        const players = rooms.get(joinedRoom);
        if (players?.length === 2) {
            io.to(joinedRoom).emit("start");
        } else {
            socket.emit("roomFull");
            return
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



    socket.on("move", (moveData: any) => {
        socket.to(joinedRoom).emit("move", { playerColor: playerColor, playedMove: moveData });
    });

    socket.on('chat', (message) => {
        let player = rooms.get(joinedRoom)?.find((player: any) => player.id === socket.id);
        if (player) {
            socket.to(joinedRoom).emit('chat', { ...message, type: 'received', player: socket.id, time: Date.now() });
        }
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
        const players: any = rooms.get(joinedRoom);
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