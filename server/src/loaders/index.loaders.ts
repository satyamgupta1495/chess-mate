import PeerJs from "./peerJsLoader";
import Express from "./expressLoader";
import SocketManager from "./socketManager";
import Container from "typedi";
import connectDB from "./dbLoader";

class App {
    constructor() { }

    public start() {
        connectDB()
        const express = Container.get(Express);
        express.init()
        const socket = new SocketManager(express.server)
        socket.setupSocketEventHandlers()
        const peer = Container.get(PeerJs);
        peer.init()
    }
}

export default App