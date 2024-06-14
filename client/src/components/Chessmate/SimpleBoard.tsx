import { Chessboard } from "react-chessboard";
import useSimpleBoard from "./hooks/useSimpleBoard";
import { TbChessQueen, TbChessQueenFilled } from "react-icons/tb";
import CustomDialogueBox from "./DialogueBox/CustomDialogueBox";
import Chat from "./Chat";
import Video from "./Video";
import WinnerModel from "./DialogueBox/WinnerModel";
import HourLoader from "./HourLoader";
import PlayerDisconnected from "./DialogueBox/PlayerDisconnected";

type SimpleBoardProps = {
  mode?: string,
  setMode?: any,
  position?: any,
  game?: any,
  setGame?: any,
  currentTheme?: string,
  setCurrentTurn?: any,
  currentTurn?: string,
  setPosition: any
}

export default function SimpleBoard({ mode, setMode, position, setPosition, game, setGame, currentTheme, setCurrentTurn, currentTurn }: SimpleBoardProps) {

  const { roomType, setRoomType, boardWidth, onDrop, onSquareClick, onSquareRightClick, moveSquares, optionSquares, moveHistory, rightClickedSquares, customStyles, showPromotionDialog, moveTo, sendChat, chat, message, setMessage, orientation, playerLeft, winner, startGame } = useSimpleBoard({ game, mode, position, setPosition, currentTheme, setCurrentTurn, currentTurn })

  return (
    <>
      {!startGame && roomType?.roomName && !playerLeft && <HourLoader />}
      {playerLeft && <PlayerDisconnected />}

      <div className="simple-board">
        <CustomDialogueBox setRoomType={setRoomType} setMode={setMode} />
        <WinnerModel winner={winner} orientation={orientation} setPosition={setPosition} setGame={setGame} />
        <div className="main-container">
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
                ...customStyles
              }}
              promotionToSquare={moveTo}
              showPromotionDialog={showPromotionDialog}
              boardOrientation={orientation}
            />
          </div>


          <div className={`${mode !== "" ? "hidden" : ""} chat`}>
            <Chat sendChat={sendChat} chat={chat} message={message} setMessage={setMessage} />
          </div>

          <div className={`${mode !== "" ? "hidden" : ""} history`}>
            <div className="turns-container">
              <div className="turn-indicator">
                <span className="turn-icon">
                  {currentTurn === "w" ? <TbChessQueen /> : <TbChessQueenFilled />}
                </span>
                <span className="turn-text">
                  {currentTurn === "w" ? "White to move" : "Black to move"}
                </span>
              </div>
              <div className="move-history">
                <p>Move history : </p>
                {moveHistory.map((move: any, index: number) => {
                  return (
                    <div key={index} className="history-item">
                      <p>{move.piece}{move.to},</p>
                    </div>
                  )
                })}
              </div>
            </div>
            <Video roomId={roomType?.roomName} startGame={startGame} />
          </div>
        </div >
      </div>
    </>
  );
}
