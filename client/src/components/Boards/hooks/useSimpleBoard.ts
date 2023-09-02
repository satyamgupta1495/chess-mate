import { Chess, Move } from 'chess.js';
import { useState } from 'react';
import { Square } from 'react-chessboard/dist/chessboard/types';

export default function useSimpleBoard({ game, setGame, mode, setCurrentTurn, currentTurn }: any) {

    const [moveFrom, setMoveFrom] = useState("");
    const [moveTo, setMoveTo] = useState<Square | null>(null);
    const [showPromotionDialog, setShowPromotionDialog] = useState(false);
    const [rightClickedSquares, setRightClickedSquares] = useState({});
    const [moveSquares, setMoveSquares] = useState({});
    const [optionSquares, setOptionSquares] = useState({});

    //! This function is used to update the game state in a safe way.
    function safeGameMutate(modify: any) {
        setGame((g) => {
            const update = { ...g };
            modify(update);
            return update;
        });
    }

    function resetMove() {
        setMoveFrom("");
        setMoveTo(null);
        setShowPromotionDialog(false);
        setOptionSquares({});
    }

    const makeMove = (move: object) => {
        game.move(move)
        setGame(new Chess(game.fen()))
        resetMove()
        setCurrentTurn(currentTurn === 'White' ? 'Black' : 'White')
    }

    function makeRandomMove() {
        const possibleMoves = game.moves();
        if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
            alert(currentTurn === 'White' ? 'White wins🎊' : 'Black Wins🎊')
            return;
        }
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        makeMove(possibleMoves[randomIndex]);
    }

    function onDrop(sourceSquare: string, targetSquare: string, piece: string) {
        const move = makeMove({
            from: sourceSquare,
            to: targetSquare,
            promotion: piece.slice(1).toLowerCase() ?? "q",
        });

        //! illegal move
        if (move === null) return false;
        { mode === 'random' && setTimeout(makeRandomMove, 200); }

        resetMove()
        return true;
    }

    //! This takes a square like "h2" and returns a boolean indicating whether the square has any valid moves.
    function getMoveOptions(square: Square): boolean {
        const moves = game.moves({
            square,
            verbose: true,
        });

        if (moves.length === 0) {
            setOptionSquares({});
            return false;
        }

        const newSquares = {};
        moves.map((move: any) => {
            newSquares[move.to] = {
                background:
                    game.get(move.to) &&
                        game.get(move.to).color !== game.get(square).color //! This excludes current square of piece from being highlighted
                        ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
                        : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
                borderRadius: "50%",
            };
            return move;
        });

        //! Highlight the current selected square
        newSquares[square] = {
            background: "rgba(255, 255, 0, 0.4)",
        };
        setOptionSquares(newSquares);
        return true;
    }

    function onSquareClick(square: Square) {
        setRightClickedSquares({});

        //! If there's no moveFrom square, set it to the clicked square
        if (!moveFrom) {
            const hasMoveOptions = getMoveOptions(square);
            if (hasMoveOptions) setMoveFrom(square);
            return;
        }

        //! to square
        if (!moveTo) {
            //! check if valid move before showing dialog
            const moves = game.moves({
                moveFrom,
                verbose: true,
            });
            const foundMove = moves.find(
                (m: Move) => m.from === moveFrom && m.to === square
            );

            //! If its not a valid move
            if (!foundMove) {
                //! check if clicked on new piece
                const hasMoveOptions = getMoveOptions(square);

                //! if new piece, setMoveFrom, otherwise clear moveFrom
                setMoveFrom(hasMoveOptions ? square : "");
                return;
            }

            //! valid move
            setMoveTo(square);

            //! if promotion move
            if (
                //! Checks if white pawn is on 8th row or black pawn is on 1st row
                (foundMove.color === "w" &&
                    foundMove.piece === "p" &&
                    square[1] === "8") ||
                (foundMove.color === "b" &&
                    foundMove.piece === "p" &&
                    square[1] === "1")
            ) {
                setShowPromotionDialog(true);
                return;
            }

            //! If normal move
            // const gameCopy = { ...game };
            const move: any = makeMove({
                from: moveFrom,
                to: square,
                promotion: "q",
            });

            //! If invalid, setMoveFrom and getMoveOptions
            if (move === null) {
                const hasMoveOptions = getMoveOptions(square);
                if (hasMoveOptions) setMoveFrom(square);
                return;
            }

            makeMove(move);

            { mode === 'random' && setTimeout(makeRandomMove, 300) }

            //! Reset all suggestions
            resetMove()
            return;
        }
    }

    function onPromotionPieceSelect(piece: any) {
        if (piece) {
            const gameCopy = { ...game };
            gameCopy.move({
                from: moveFrom,
                to: moveTo,
                promotion: piece[1].toLowerCase() ?? "q",
            });
            setGame(gameCopy);
        }

        resetMove()
        return true;
    }

    function onSquareRightClick(square: string) {
        const colour = "rgba(0, 0, 255, 0.4)";
        setRightClickedSquares({
            ...rightClickedSquares,
            [square]:
                rightClickedSquares[square] &&
                    rightClickedSquares[square].backgroundColor === colour
                    ? undefined
                    : { backgroundColor: colour },
        });
    }

    return {
        safeGameMutate, getMoveOptions, moveFrom, setMoveFrom, moveTo, setMoveTo, showPromotionDialog, setShowPromotionDialog, rightClickedSquares, setRightClickedSquares, moveSquares, setMoveSquares, optionSquares, setOptionSquares, onSquareClick, onPromotionPieceSelect, onSquareRightClick, onDrop
    }

}