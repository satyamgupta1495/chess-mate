import { useState } from 'react'
import { Chess } from 'chess.js'

export default function useChessMate() {

    const [game, setGame] = useState<any>(new Chess());
    const [mode, setMode] = useState<string>("random")
    const [currTheme, setCurrTheme] = useState<string>("default")
    const [currentTurn, setCurrentTurn] = useState("w")
    const [position, setPosition] = useState("start")
    // const [showDialogue, setShowDialogue] = useState(true)

    return {
        game, setGame, mode, setMode, currTheme, setCurrTheme, currentTurn, setCurrentTurn, position, setPosition
    }

}