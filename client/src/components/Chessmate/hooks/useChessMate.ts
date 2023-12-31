import { useState } from 'react'
import { Chess } from 'chess.js'

export default function useChessMate() {

    const [game, setGame] = useState<any>(new Chess());
    const [mode, setMode] = useState<string>("")
    const [currTheme, setCurrTheme] = useState<string>("#769656")
    const [currentTurn, setCurrentTurn] = useState("w")
    const [position, setPosition] = useState("start")
    // const [showDialogue, setShowDialogue] = useState(true)

    return {
        game, setGame, mode, setMode, currTheme, setCurrTheme, currentTurn, setCurrentTurn, position, setPosition
    }

}