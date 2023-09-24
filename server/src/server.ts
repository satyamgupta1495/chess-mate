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

    //save session of current user in socket
    let playerData: any = {
        id: socket.id,
        room: '',
        color: '',
        type: ''
    }

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
            const players = [{ color: player1Color, id: socket.id, peerId: roomData.peerId }];
            rooms.set(joinedRoom, players);

            // console.log(`Player 1 with socket ID ${socket.id} joined room ${joinedRoom} as ${player1Color}.`);
            socket.join(joinedRoom);
            socket.emit(`joinedAs`, { orientation: player1Color })

            //save player data
            playerData.id = socket.id;
            playerData.room = joinedRoom;
            playerData.color = player1Color;
            playerData.type = 'create';



            // socket.emit('saveSession', { player1Data: playerData });
        }

        if (roomData?.type === 'join') {

            const canJoinRoom = rooms.has(roomData?.roomName);
            // console.log("canJoinRoom", canJoinRoom);

            socket.emit("roomNotFound", { canJoinRoom: canJoinRoom });

            if (!canJoinRoom) return

            joinedRoom = `${roomData?.roomName}`;
            const players = rooms.get(joinedRoom) || [];

            player2Color = 'b';
            if (players.length === 1) {
                player2Color = players[0].color === "w" ? "b" : "w";
            }

            players.push({ color: player2Color, id: socket.id, peerId: roomData.peerId });
            rooms.set(joinedRoom, players);
            // console.log(`Player 2 with socket ID ${socket.id} joined room ${joinedRoom} as ${player2Color}.`);
            socket.join(joinedRoom);
            socket.emit(`joinedAs`, { orientation: player2Color })
            // console.log('joinedas---', player2Color)

            playerData.id = socket.id;
            playerData.room = joinedRoom;
            playerData.color = player2Color;
            playerData.type = 'join';



            // socket.emit('saveSession', { player2Data: playerData });
        }

        socket.on('reconnect', (data) => {
            // console.log('reconnect----', data);
            socket.join(data?.room);
            socket.emit(`joinedAs`, { orientation: data?.color })
        });

        const players = rooms.get(joinedRoom);
        if (players?.length === 2) {
            io.to(joinedRoom).emit("start", { player1: { socketId: players[0].id, peerId1: players[0].peerId }, player2: { socketId: players[1].id, peerId2: players[1].peerId } });
        } else {
            socket.emit("roomFull");
            return
        }
    });

    socket.on("move", (moveData: any) => {
        socket.to(joinedRoom).emit("move", { playerColor: playerColor, playedMove: moveData });
    });

    socket.on('chat', (message) => {
        let player = rooms.get(joinedRoom)?.find((player: any) => player.id === socket.id);
        if (player) {
            socket.to(joinedRoom).emit('chat', { ...message, type: 'received', player: socket.id, time: Date.now() });
        }
    });

    socket.on("new_peer", (data) => {
        console.log("new peer---->",data)
        io.to(joinedRoom).emit("new_peer", { peerId: data.peerId, socketId: data.socketId })
    })


    socket.on("disconnect", () => {
        // console.log("Client disconnected");
        const players: any = rooms.get(joinedRoom);
        if (players) {
            const playerId = players;
            // delete players[socket.id];
            // console.log("Player left", playerId);
            socket.to(joinedRoom).emit("playerLeft", { playerId });
            // if (Object.keys(players).length === 0) {
            //     rooms.delete(joinedRoom);
            // console.log("Room deleted");
            // }
        }
    });
});



app.get("/", (req, res) => {
    res.send("OK 👍");
});

httpServer.listen(port, () => console.log(`Port: ${port} Server active...`));