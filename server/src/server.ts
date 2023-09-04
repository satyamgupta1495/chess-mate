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

io.on("connection", (socket: Socket) => {
    socket.on("move", (payload) => {
        console.log(payload);
        io.emit("move", payload);
    });
});

app.get("/", (req, res) => {
    res.send("OK 👍");
});

httpServer.listen(port, () => console.log(`Port: ${port} Server active...`));