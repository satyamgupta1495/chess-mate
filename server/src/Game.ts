import { Socket } from "socket.io";
import { Chess } from 'chess.js'
import { GameConstant } from "./constants/constants";
import { Service } from "typedi";

@Service()
export class Game {
    public player1: Socket;
    public player2: Socket;
    private game: Chess;
    private startTime: Date;
    public moveHistory: any[];

    constructor() {
        this.game = new Chess();
        this.startTime = new Date();
        this.moveHistory = [];
    }

    private getKingPosition(board: any, color: any) {
        const squares = board.board();
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = squares[row][col];
                if (square && square.type === 'k' && square.color === color) {
                    return String.fromCharCode(97 + col) + (8 - row);
                }
            }
        }
        return null;
    }

    private checkIfGameOver(game) {
        let payload: any;
        if (game.isGameOver()) {
            if (game.isCheckmate()) {
                payload = {
                    type: "Checkmate",
                    message: `Checkmate! 🎉 ${game.turn() === 'w' ? "Black" : "White"} wins 👏`
                }
            } else if (game.isStalemate()) {
                payload = {
                    type: "Stalemate",
                    message: `Stalemate! 🎉 Its a draw 👏`
                }
            } else if (game.isThreefoldRepetition()) {
                payload = {
                    type: "Repetition",
                    message: `Threefold repetition! 🎉 Its a draw 👏`
                }
            } else if (game.isInsufficientMaterial()) {
                payload = {
                    type: "Insufficient",
                    message: `Insufficient material! 🎉 Its a draw 👏`
                }
            }
        } else if (game.inCheck()) {
            const currKingPosition: any = this.getKingPosition(game, game.turn() === 'b' ? "b" : "w")
            payload = {
                type: "Check",
                check: currKingPosition
            }
        }
        return payload;
    }

    makeMove(moveData) {
        const game = this.game ?? new Chess()
        const payload = {} as any
        try {
            payload.playerColor = moveData.currentTurn === 'w' ? 'w' : 'b'
            payload.playedMove = {
                currentTurn: moveData.currentTurn === 'w' ? 'b' : 'w',
                move: moveData.move
            }
            payload.gameState = this.checkIfGameOver(game) ?? null

        } catch (e) {
            console.error(e)
        }
        this.moveHistory = game.history({ verbose: true }).map(move => {
            if (!move) {
                return null
            }
            return {
                turn: moveData.currentTurn,
                from: move.from,
                to: move.to,
                piece: game.get(move.from)?.type ?? '',
            }
        }).filter(Boolean)
        return payload
    }

}