import { createServer } from "http";
import { Server } from "socket.io";
import PeerJs from "./peerJsLoader";
import Express from "./expressLoader";
import SocketManager from "./socketManager";

class App {
    private io: Server;

    constructor() { }

    public start() {
        const express = new Express();
        const httpServer = createServer(express.express);
        const peer = new PeerJs();
        const socket = new SocketManager(httpServer)

        socket.setupSocketEventHandlers()
        express.init()
        peer.init()
    }
}

export default App