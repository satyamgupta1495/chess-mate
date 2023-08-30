import { useState } from 'react'
import { Chess } from 'chess.js'
import SimpleBoard from './Boards/SimpleBoard'
import Controls from './Controls/Controls';

function ChessMate() {
    const [game, setGame] = useState<any>(new Chess());
    const [mode, setMode] = useState<string>("")

    const makeMove = (move: object) => {
        game.move(move)
        setGame(new Chess(game.fen()))
    }

    function makeRandomMove() {
        const possibleMoves = game.moves();
        if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) {
            alert("Game over");
            return;
        }
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        makeMove(possibleMoves[randomIndex]);
    }

    function onDrop(sourceSquare: string, targetSquare: string) {
        const move = makeMove({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q",
        });

        // illegal move
        if (move === null) return false;
        { mode === 'random' && setTimeout(makeRandomMove, 200); }
        return true;
    }

    return (
        <>
            <div className="container">
                <Controls setGame={setGame} setMode={setMode} mode={mode} />
                <SimpleBoard position={game.fen()} onPieceDrop={onDrop} />
            </div >
        </>
    )
}

export default ChessMate