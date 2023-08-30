import { useState } from 'react'
import { Chess } from 'chess.js'

export default function useChessMate() {

    const [game, setGame] = useState<any>(new Chess());
    const [mode, setMode] = useState<string>("")

    const makeMove = (move: object) => {
        game.move(move)
        setGame(new Chess(game.fen()))
    }

    function makeRandomMove() {
        const possibleMoves = game.moves();
        if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) {
            alert("Game over!");
            return;
        }
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        makeMove(possibleMoves[randomIndex]);
    }

    function onDrop(sourceSquare: string, targetSquare: string, piece: string) {

        console.log(piece)
        const move = makeMove({
            from: sourceSquare,
            to: targetSquare,
            promotion: piece.slice(1).toLowerCase() ?? "q",
        });

        // illegal move
        if (move === null) return false;
        { mode === 'random' && setTimeout(makeRandomMove, 200); }
        return true;
    }

    return {
        game, setGame, mode, setMode, makeMove, makeRandomMove, onDrop
    }

}