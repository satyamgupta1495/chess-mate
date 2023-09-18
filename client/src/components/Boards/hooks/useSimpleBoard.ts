import taost from 'react-hot-toast'
export default function useSimpleBoard({ game, makeMove, currentTurn }: any) {

    function makeRandomMove() {
        const possibleMoves = game.moves();
        if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
            taost(currentTurn === 'White' ? 'Checkmate Black wins🎊🤯' : 'White Wins🎊🤯')
            return;
        }
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        makeMove(possibleMoves[randomIndex]);
    }

    function getKingPosition(board: any, color: any) {
        const squares = board.board();
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = squares[row][col];
                if (square && square.type === 'k' && square.color === color) {
                    return String.fromCharCode(97 + col) + (8 - row);
                }
            }
        }
        return null; // King not found
    }

    return {
        makeRandomMove, getKingPosition
    }

}