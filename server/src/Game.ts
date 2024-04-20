import { Socket } from "socket.io";
import { Chess } from 'chess.js'
import { GameConstant } from "./constants/constants";

export class Game {

    public player1: Socket;
    public player2: Socket;
    private board: Chess;
    private startTime: Date;

    constructor(player1: Socket, player2: Socket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: GameConstant.INIT_GAME,
            payload: {
                color: 'white'
            }
        }))
        this.player2.send(JSON.stringify({
            type: GameConstant.INIT_GAME,
            payload: {
                color: 'black'
            }
        }))
    }

    makeMove(socket: Socket, move: {
        from: string; to: string
    }) {

        if (this.board.moves.length % 2 === 0 && socket !== this.player1) {
            return
        }
        if (this.board.moves.length % 2 === 1 && socket !== this.player2) {
            return
        }

        try {
            this.board.move(move)
        } catch (e) {
            return;
        }

        if (this.board.isGameOver()) {
            this.player1.emit(JSON.stringify({
                type: GameConstant.GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? 'black' : 'white'
                }
            }))
            this.player2.emit(JSON.stringify({
                type: GameConstant.GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? 'black' : 'white'
                }
            }))
            return
        }

        if (this.board.move.length % 2 === 0) {
            this.player2.emit(JSON.stringify({
                type: GameConstant.MOVE,
                payload: move
            }))
        } else {
            this.player1.emit(JSON.stringify({
                type: GameConstant.MOVE,
                payload: move
            }))
        }
    }
}