import { Socket } from "socket.io";
import { GameConstant } from "./constants/constants";
import { Game } from "./Game";

export class GameManager {
    private games: any[];
    private extraPlayer: any;
    private users: any[]
    private joinedRoom: string | string[];
    private rooms = new Map()


    constructor() {
        this.games = [];
        this.extraPlayer = null;
        this.users = [];
        this.joinedRoom = '';
    }

    gameStartHandler(message, roomData) {
        let player1Color = "";
        let player2Color = "";
        if (message === GameConstant.INIT_GAME) {

        }
    }

    // adduser(socket) {
    //     this.users.push(socket);
    //     this.addHandler(socket)
    // }

    // removeUser(socket) {
    //     this.users = this.users.filter(user => user !== socket)
    // }

    // private addHandler(socket: Socket) {
    //     socket.on('message', (data) => {
    //         const message = JSON.parse(data.toString())

    //         if (message.type === GameConstant.INIT_GAME) {
    //             if (this.extraPlayer) {
    //                 const game = new Game(this.extraPlayer, socket)
    //                 this.games.push(game)
    //                 this.extraPlayer = null;
    //             } else {
    //                 this.extraPlayer = socket
    //             }
    //         }

    //         if (message.type === GameConstant.MOVE) {
    //             const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
    //             if (game) {
    //                 game.makeMove(socket, message.move)
    //             }
    //         }

    //     })
    // }

}