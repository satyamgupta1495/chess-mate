import { Server, Socket } from "socket.io";
import { Server as HTTPServer } from "http";

class SocketManager {
    private io: Server;

    constructor(httpServer: HTTPServer) {
        this.io = new Server(httpServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
            },
        });

        this.setupSocketEventHandlers();
    }

    public setupSocketEventHandlers(): void {
        this.io.on("connection", (socket: Socket) => {
            console.log("new connection - ", socket)
        });
    }
}

export default SocketManager;
