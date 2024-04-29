import { createServer } from "http";
import { Server } from "socket.io";
import PeerJs from "./peerJsLoader";
import Express from "./expressLoader";
import SocketManager from "./socketManager";
import Container from "typedi";

class App {
    private io: Server;

    constructor() { }

    public start() {
        const express = Container.get(Express);
        express.init()
        const socket = new SocketManager(express.server)
        socket.setupSocketEventHandlers()
        const peer = Container.get(PeerJs);
        // peer.init()
    }
}

export default App