import { useEffect, useRef, useState } from "react";
import { Chessboard } from "react-chessboard";
import useSimpleBoard from "./hooks/useSimpleBoard";
import { Container } from "react-bootstrap";
import { TbChessQueen, TbChessQueenFilled } from "react-icons/tb";
import { Move } from 'chess.js';
import { Square } from 'react-chessboard/dist/chessboard/types';
import { socket } from "../../Socket";
import CustomDialogueBox from "../DialogueBox/CustomDialogueBox";
import Chat from "./Chat/Chat";
import toast from "react-hot-toast";

type SimpleBoardProps = {
  mode?: string,
  position?: any,
  game?: any,
  setGame?: any,
  currentTheme?: string,
  setCurrentTurn?: any,
  currentTurn?: string,
  setPosition: any
}

export default function SimpleBoard({ mode, position, setPosition, game, currentTheme, setCurrentTurn, currentTurn }: SimpleBoardProps) {

  const [boardWidth, setBoardWidth] = useState(window.innerWidth * 0.8);
  const [moveFrom, setMoveFrom] = useState("");
  const [moveSquares] = useState<any>({});
  const [moveTo, setMoveTo] = useState<Square | null>(null);
  const [optionSquares, setOptionSquares] = useState<any>({});
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  const [rightClickedSquares, setRightClickedSquares] = useState<any>({});
  const [orientation, setOrientation] = useState<any>('')
  const [startGame, setStartGame] = useState(false)
  const [playerLeft, setPlayerLeft] = useState(false)
  const [roomType, setRoomType] = useState<any>({})
  const [moveHistory, setMoveHistory] = useState<any>([])

  const [message, setMessage] = useState<any>('')
  const [chat, setChat] = useState<any>([])

  const chatEventHandlerAdded = useRef(false);

  const { makeRandomMove } = useSimpleBoard({ game, makeMove, currentTurn })

  function handleResize() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const minDimension = Math.min(windowWidth, windowHeight);
    let boardWidth = Math.floor(minDimension * 0.8);
    if (windowWidth < 700) {
      boardWidth = 350;
    }
    setBoardWidth(boardWidth);
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  function resetMove() {
    setMoveFrom("");
    setMoveTo(null);
    setShowPromotionDialog(false);
    setOptionSquares({});
  }

  function makeMove(move: Move) {

    const result = game.move(move);
    if (result !== null) {
      setCurrentTurn(currentTurn === "w" ? "b" : "w");
      setPosition(game.fen());
    }
    setMoveHistory(game.history({ verbose: true }).map((move) => ({
      turn: currentTurn,
      from: move.from,
      to: move.to,
      piece: game.get(move.from)?.type,
    })));
    return result;
  }

  function onDrop(sourceSquare: string, targetSquare: string, piece: string) {

    console.log(game.turn() !== orientation[0], game.turn(), orientation[0])

    //* check if the player is moving own piece 
    {
      if (startGame && game.turn() !== orientation[0]?.toLowerCase()) {
        toast.error('Its not your turn 😏')
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
      move: move
    };

    //* illegal move
    if (move === null) return false;
    { !startGame && mode === 'random' && setTimeout(makeRandomMove, 200); }

    makeMove(move)
    { startGame && socket.emit('move', moveData) }
    resetMove()
    return true;
  }

  //* This takes a square like "h2" and returns a boolean indicating whether the square has any valid moves.
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
            game.get(move.to).color !== game.get(square).color //* This excludes current square of piece from being highlighted
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
      return move;
    });

    //* Highlight the current selected square
    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };
    setOptionSquares(newSquares);
    return true;
  }

  function onSquareClick(square: Square) {

    {
      if (startGame && game.turn() !== orientation[0]?.toLowerCase()) {
        toast.error('Its not your turn 😏')
        return
      }
    }

    setRightClickedSquares({});

    //* If there's no moveFrom square, set it to the clicked square
    if (!moveFrom) {
      const hasMoveOptions = getMoveOptions(square);
      if (hasMoveOptions) setMoveFrom(square);
      return;
    }

    //* to square
    if (!moveTo) {
      //* check if valid move before showing dialog
      const moves = game.moves({
        moveFrom,
        verbose: true,
      });
      const foundMove = moves.find(
        (m: Move) => m.from === moveFrom && m.to === square
      );

      //* If its not a valid move
      if (!foundMove) {
        //* check if clicked on new piece
        const hasMoveOptions = getMoveOptions(square);

        //* if new piece, setMoveFrom, otherwise clear moveFrom
        setMoveFrom(hasMoveOptions ? square : "");
        return;
      }

      //* valid move
      setMoveTo(square);

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
        setShowPromotionDialog(true);
        return;
      }

      //* If normal move
      const move: any = {
        from: moveFrom,
        to: square,
        promotion: "q",
      };

      const moveData = {
        currentTurn: currentTurn,
        move: move
      };

      //* If invalid, setMoveFrom and getMoveOptions
      if (move === null) {
        const hasMoveOptions = getMoveOptions(square);
        if (hasMoveOptions) setMoveFrom(square);
        return;
      }

      makeMove(move);
      { startGame && socket.emit('move', moveData) }
      { !startGame && mode === 'random' && setTimeout(makeRandomMove, 300) }

      //* Reset all suggestions
      resetMove()
      return;
    }
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

  useEffect(() => {

    //* joined as white
    socket.on('joinedAsw', (data: any) => {
      console.log('joined as', data)
      setOrientation('white')
    })

    //* joined as black
    socket.on('joinedAsb', (data: any) => {
      console.log('joined as', data)
      setOrientation('black')
    })

    socket.on('start', () => {
      setStartGame(true)
    })

    socket.on('playerLeft', (playerData: any) => {
      console.log('player left', playerData)
      setStartGame(false)
      setPlayerLeft(true)
    })

    socket.on('move', (playedMove: any) => {
      console.log('move played', playedMove)
      setCurrentTurn(playedMove.playerColor === 'w' ? 'b' : 'w')
      makeMove(playedMove.playedMove.move)
    })

    if (!chatEventHandlerAdded.current) {
      socket.on('chat', (chatData: any) => {
        console.log('chat', chatData)
        setChat((prevChat: any) => [...prevChat, chatData]);
      });
      chatEventHandlerAdded.current = true;
    }

    //eslint-disable-next-line
  }, [])



  useEffect(() => {
    console.log("roomType", roomType)
    socket.emit("startGame", { ...roomType })
    //eslint-disable-next-line
  }, [roomType])

  function sendChat(e: any) {
    e.preventDefault()
    if (!message) {
      toast.error('Please enter a message to send')
      return
    }
    setChat((prevChat: any) => [...prevChat, { type: 'sent', message: message, time: Date.now() }])
    socket.emit('chat', { message: message })
    setMessage('')
  }

  return (
    <>
      <CustomDialogueBox setRoomType={setRoomType} />
      <Container>
        <p className="text-center h1 my-3">♟️Chessmate</p>
        <section className="chess-board-container">
          <div className="chess-board">
            <Chessboard id="BasicBoard"
              boardWidth={boardWidth}
              customDarkSquareStyle={{ backgroundColor: `${currentTheme}` || '#769656' }}
              customLightSquareStyle={{ backgroundColor: '#eeeed2' }}
              customBoardStyle={{ borderRadius: '5px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5 ' }}
              position={position}
              onPieceDrop={onDrop}
              onSquareClick={onSquareClick}
              onSquareRightClick={onSquareRightClick}
              customSquareStyles={{
                ...moveSquares,
                ...optionSquares,
                ...rightClickedSquares,
              }}
              promotionToSquare={moveTo}
              showPromotionDialog={showPromotionDialog}
              boardOrientation={orientation}
            />
          </div>

          <div className="chess-board-controls">
            <p className="my-0">
              <span className="turns-icon">{currentTurn === "w" ? <TbChessQueen /> : <TbChessQueenFilled />}</span>
              {currentTurn === "w" ? "White to move!" : "Black to move!"}
            </p>

            <div className="move-history">
              <p className="mr-2">Move history : </p>
              {moveHistory.map((move: any, index: number) => {
                return (
                  <>
                    <div key={index} className="move-history-item">
                      <p>{move.piece}{move.to},
                      </p>
                    </div>
                  </>
                )
              })}
            </div>
            {startGame && <Chat sendChat={sendChat} chat={chat} message={message} setMessage={setMessage} />}
          </div>
        </section>
      </Container >
      {playerLeft && <h1> Player left the game! </h1>}
    </>
  );
}