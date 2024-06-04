import { useEffect, useRef, useState } from "react"
import taost, { toast } from "react-hot-toast"
import { socket } from "@/Socket"
import { Square } from "chess.js"
import { Move, TPlayedMove } from "@/types/Game"
import useChessStore from "@/store/useChessStore"
import { updateUserStatsApi } from "@/helper"

export default function useSimpleBoard({
    mode,
    setPosition,
    game,
    setCurrentTurn,
    currentTurn,
}: any) {
    const [boardWidth, setBoardWidth] = useState(window.innerWidth * 0.8)
    const [moveFrom, setMoveFrom] = useState("")
    const [moveTo, setMoveTo] = useState<Square | null>(null)
    const [moveSquares] = useState<any>({})
    const [optionSquares, setOptionSquares] = useState<any>({})
    const [showPromotionDialog, setShowPromotionDialog] = useState(false)
    const [rightClickedSquares, setRightClickedSquares] = useState<any>({})
    const [orientation, setOrientation] = useState<any>("")
    const [startGame, setStartGame] = useState(false)
    const [playerLeft, setPlayerLeft] = useState(false)
    const [roomType, setRoomType] = useState<any>({})
    const [moveHistory, setMoveHistory] = useState<any>([])
    const [customStyles, setCustomStyles] = useState<any>({})
    const [message, setMessage] = useState<string>("")
    const [winner, setWinner] = useState<any>("");
    //todo move to db
    const [chat, setChat] = useState<any>([])
    const oppPlayePeerId = useRef<any>("")

    const chatEventHandlerAdded = useRef(false)

    const { user }: any = useChessStore(state => state)

    const updateUserStats = async (data) => {
        try {
            const updatedStats = await updateUserStatsApi(data)
            console.log("updatedState", updatedStats)
        } catch (error) {
            console.log("error", error)
        }
    }


    useEffect(() => {
        setCustomStyles({})
        if (game.game_over()) {
            let outcome = "";
            if (game.in_checkmate()) {
                const winningPlayer = game.turn() === "w" ? "b" : "w";
                setWinner(winningPlayer);
                toast.error(`Checkmate! 🎉 ${winningPlayer === "w" ? "White" : "Black"} wins 👏`);
                const isUserWhite = orientation === 'white';
                const isUserWinner = (isUserWhite && winningPlayer === 'w') || (!isUserWhite && winningPlayer === 'b');
                outcome = isUserWinner ? 'wins' : 'losses';
            } else if (game.in_stalemate()) {
                outcome = 'draws';
                toast.error(`Stalemate! 🎉 Its a draw 👏`)
            } else if (game.in_threefold_repetition()) {
                outcome = 'draws';
                toast.error(`Threefold repetition! 🎉 Its a draw 👏`)
            } else if (game.insufficient_material()) {
                outcome = 'draws';
                toast.error(`Insufficient material! 🎉 Its a draw 👏`)
            }

            console.log("outcome", outcome)
            if (user?.loggedInUser?._id) {
                const data = {
                    userId: user?.loggedInUser?._id,
                    [outcome]: true
                }
                updateUserStats(data)
            }

        } else if (game.in_check()) {
            const currKingPosition: any = getKingPosition(
                game,
                game.turn() === "b" ? "b" : "w"
            )
            setCustomStyles({
                [currKingPosition]: {
                    background:
                        "radial-gradient(ellipse at center, rgba(255,0,0,0) 0%, rgba(255,0,0,0.5) 50%, rgba(255,0,0,0.9) 70%)",
                },
            })
            const message = `Uhh-humm... A check! from ${game.turn() === "b" ? "White" : "Black"
                } 😬`
            if (!startGame || game.turn() === orientation[0]?.toLowerCase()) {
                toast.error(message)
            }
        }
        //eslint-disable-next-line
    }, [currentTurn])

    function handleResize() {
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight
        const minDimension = Math.min(windowWidth, windowHeight)
        let boardWidth = Math.floor(minDimension * 0.8)
        if (windowWidth < 700) {
            boardWidth = 350
        }
        setBoardWidth(boardWidth)
    }

    useEffect(() => {
        handleResize()
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    function resetMove() {
        setMoveFrom("")
        setMoveTo(null)
        setShowPromotionDialog(false)
        setOptionSquares({})
    }

    function makeMove(move: Move) {
        if (customStyles) {
            setCustomStyles({})
        }
        const result = game.move(move)
        if (result !== null) {
            setCurrentTurn(currentTurn === "w" ? "b" : "w")
            setPosition(game.fen())
        }

        //TODO : ths will be saved in db
        setMoveHistory(
            game.history({ verbose: true }).map((move) => ({
                turn: currentTurn,
                from: move.from,
                to: move.to,
                piece: game.get(move.from)?.type,
            }))
        )
        setPosition(game.fen())
        return result
    }

    function onDrop(sourceSquare: string, targetSquare: string, piece: string) {
        //* check if the player is moving own piece
        {
            if (startGame && game.turn() !== orientation[0]?.toLowerCase()) {
                toast.error("Its not your turn 😏")
                return false
            }
        }

        const move: any = {
            from: sourceSquare,
            to: targetSquare,
            promotion: piece.slice(1).toLowerCase() ?? "q",
        }
        const moveData = {
            currentTurn: currentTurn,
            move: move,
        }

        //* illegal move
        if (move === null) return false
        {
            !startGame && mode === "random" && setTimeout(makeRandomMove, 200)
        }
        const moveSuccess = makeMove(move)
        if (startGame && moveSuccess) {
            socket.emit("move", moveData)
        }

        resetMove()
        return true
    }

    function getMoveOptions(square: Square): boolean {
        //* This takes a square like "h2" and returns a boolean indicating whether the square has any valid moves.

        const moves = game.moves({
            square,
            verbose: true,
        })

        if (moves.length === 0) {
            setOptionSquares({})
            return false
        }

        const newSquares = {}
        moves.map((move: any) => {
            newSquares[move.to] = {
                background:
                    game.get(move.to) &&
                        game.get(move.to).color !== game.get(square).color //* This excludes current square of piece from being highlighted
                        ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
                        : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
                borderRadius: "50%",
            }
            return move
        })

        //* Highlight the current selected square
        newSquares[square] = {
            background: "rgba(255, 255, 0, 0.4)",
        }
        setOptionSquares(newSquares)
        return true
    }

    function onSquareClick(square: Square) {
        if (startGame && game.turn() !== orientation[0]?.toLowerCase()) {
            toast.error("Its ❌ your turn 😏")
            return
        }

        setRightClickedSquares({})

        //* If there's no moveFrom square, set it to the clicked square
        if (!moveFrom) {
            const hasMoveOptions = getMoveOptions(square)
            if (hasMoveOptions) setMoveFrom(square)
            return
        }

        //* to square
        if (!moveTo) {
            //* check if valid move before showing dialog
            const moves = game.moves({
                moveFrom,
                verbose: true,
            })
            const foundMove = moves.find(
                (m: Move) => m.from === moveFrom && m.to === square
            )

            //* If its not a valid move
            if (!foundMove) {
                //* check if clicked on new piece
                const hasMoveOptions = getMoveOptions(square)

                //* if new piece, setMoveFrom, otherwise clear moveFrom
                setMoveFrom(hasMoveOptions ? square : "")
                return
            }

            //* valid move
            setMoveTo(square)

            //* if promotion move
            if (
                //* Checks if w pawn is on 8th row or b pawn is on 1st row
                (foundMove.color === "w" &&
                    foundMove.piece === "p" &&
                    square[1] === "8") ||
                (foundMove.color === "b" &&
                    foundMove.piece === "p" &&
                    square[1] === "1")
            ) {
                setShowPromotionDialog(true)
                return
            }

            //* If normal move
            const move: any = {
                from: moveFrom,
                to: square,
                promotion: "q",
            }

            const moveData = {
                currentTurn: currentTurn,
                move: move,
            }

            //* If invalid, setMoveFrom and getMoveOptions
            if (move === null) {
                const hasMoveOptions = getMoveOptions(square)
                if (hasMoveOptions) setMoveFrom(square)
                return
            }

            const moveSuccess = makeMove(move)
            if (moveSuccess) {
                startGame && socket.emit("move", moveData)
            }
            {
                !startGame && mode === "random" && setTimeout(makeRandomMove, 300)
            }

            //* Reset all suggestions
            resetMove()
            return
        }
    }

    function onSquareRightClick(square: string) {
        const colour = "rgba(0, 0, 255, 0.4)"
        setRightClickedSquares({
            ...rightClickedSquares,
            [square]:
                rightClickedSquares[square] &&
                    rightClickedSquares[square].backgroundColor === colour
                    ? undefined
                    : { backgroundColor: colour },
        })
    }

    useEffect(() => {
        const playerData = localStorage.getItem("playerData")
        if (playerData) {
            const parsedPlayerData = JSON.parse(playerData)
            socket.emit("reconnect", { parsedPlayerData: parsedPlayerData })
        }

        socket.on("joinedAs", (data: any) => {
            setOrientation(data?.orientation === "w" ? "white" : "black")
        })

        socket.on("start", (data) => {
            oppPlayePeerId.current = socket.id === data?.player1?.socketId
                ? data?.player2?.socketId
                : data?.player1?.socketId
            setStartGame(true)
        })

        socket.on("playerLeft", (playerData: any) => {
            console.log("player left", playerData)
            setStartGame(false)
            setPlayerLeft(true)
        })

        socket.on("move", (playedMove: TPlayedMove) => {
            setCurrentTurn(playedMove.playerColor === "w" ? "b" : "w")
            makeMove(playedMove.playedMove.move)
        })

        if (!chatEventHandlerAdded.current) {
            socket.on("chat", (chatData: any) => {
                setChat((prevChat: any) => [...prevChat, chatData])
            })
            chatEventHandlerAdded.current = true
        }

        socket.on("msg-receieved", () => {
            toast("New message ✉️")
        })
    }, [])

    useEffect(() => {
        socket.emit("startGame", { ...roomType })
    }, [roomType])

    function sendChat(e: any) {
        e?.preventDefault()
        if (!message) {
            toast.error("Please enter a message to send")
            return
        }

        setChat((prevChat: any) => [
            ...prevChat,
            { type: "sent", message: message, time: Date.now() },
        ])
        socket.emit("chat", { message: message })
        setMessage("")
    }

    function makeRandomMove() {
        const possibleMoves = game.moves()
        if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
            taost(
                currentTurn === "White" ? "Checkmate Black wins🎊🤯" : "White Wins🎊🤯"
            )
            return
        }
        const randomIndex = Math.floor(Math.random() * possibleMoves.length)
        makeMove(possibleMoves[randomIndex])
    }

    function getKingPosition(board: any, color: any) {
        const squares = board.board()
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = squares[row][col]
                if (square && square.type === "k" && square.color === color) {
                    return String.fromCharCode(97 + col) + (8 - row)
                }
            }
        }
        return null // King not found
    }

    return {
        makeRandomMove,
        getKingPosition,
        roomType,
        setRoomType,
        boardWidth,
        onDrop,
        onSquareClick,
        onSquareRightClick,
        moveSquares,
        optionSquares,
        rightClickedSquares,
        customStyles,
        showPromotionDialog,
        moveTo,
        sendChat,
        chat,
        message,
        setMessage,
        orientation,
        playerLeft,
        moveHistory,
        winner,
        startGame
    }
}
