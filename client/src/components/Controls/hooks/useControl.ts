import { Chess } from 'chess.js'

export default function useControl({ setGame, setMode }: any) {



    function onSelect(e: any) {
        setMode(e.target.value)
        setGame(new Chess())
    }

    return {
        onSelect
    }
}