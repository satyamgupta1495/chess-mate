import { useState } from 'react'
import { Chess } from 'chess.js'

export default function useChessMate() {

    const [game, setGame] = useState<any>(new Chess());
    const [mode, setMode] = useState<string>("")
    const [currTheme, setCurrTheme] = useState<string>("default")
    const [currentTurn, setCurrentTurn] = useState<string>("White")

    return {
        game, setGame, mode, setMode, currTheme, setCurrTheme, currentTurn, setCurrentTurn
    }

}