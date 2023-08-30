import { useState } from 'react'
import { Chess } from 'chess.js'

export default function useChessMate() {

    const [game, setGame] = useState<any>(new Chess());
    const [mode, setMode] = useState<string>("")
    const [currTheme, setCurrTheme] = useState<string>("")

    return {
        game, setGame, mode, setMode, currTheme, setCurrTheme
    }

}