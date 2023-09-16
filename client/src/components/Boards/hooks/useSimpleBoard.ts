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

    return {
        makeRandomMove
    }

}