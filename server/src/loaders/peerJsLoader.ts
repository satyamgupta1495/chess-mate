import { createServer } from "http";
import { ExpressPeerServer } from 'peer';
import express from "express";
import { Service } from "typedi";

@Service()
class PeerJs {
    private peerPort: number | string;

    constructor() {
        this.peerPort = process.env.PEER_SERVER_PORT || 3001;
    }

    public init(): void {
        const app = express();
        const httpServer = createServer(app);
        const peerServer = ExpressPeerServer(httpServer, {
            allow_discovery: true
        });

        //middleware
        app.use('/peerjs', peerServer);

        httpServer.listen(this.peerPort, () => {
            console.log(`peer server is running... on port ${this.peerPort}`);
        });
    }
}

export default PeerJs;
