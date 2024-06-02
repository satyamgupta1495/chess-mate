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
  position?: any,
  game?: any,
  setGame?: any,
  currentTheme?: string,
  setCurrentTurn?: any,
  currentTurn?: string,
  setPosition: any
}

export default function SimpleBoard({ mode, position, setPosition, game, currentTheme, setCurrentTurn, currentTurn }: SimpleBoardProps) {

  const { roomType, setRoomType, boardWidth, onDrop, onSquareClick, onSquareRightClick, moveSquares, optionSquares, moveHistory, rightClickedSquares, customStyles, showPromotionDialog, moveTo, sendChat, chat, message, setMessage, orientation, playerLeft, winner, startGame } = useSimpleBoard({ game, mode, position, setPosition, currentTheme, setCurrentTurn, currentTurn })


  return (
    <>
      {!startGame && roomType?.roomName && !playerLeft && <HourLoader />}
      {playerLeft && <PlayerDisconnected />}

      <div className="simple-board">
        <CustomDialogueBox setRoomType={setRoomType} />
        <WinnerModel winner={winner} />
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

          <div className="control-container chat">
            <Chat sendChat={sendChat} chat={chat} message={message} setMessage={setMessage} />
          </div>

          <div className="control-container history">
            <Video />
            <div className="turns-container">
              <p className="my-0">
                <span className="turns-icon">
                  <span className="icon">
                    {currentTurn === "w" ? <TbChessQueen /> : <TbChessQueenFilled />}
                  </span>
                  <p>{currentTurn === "w" ? "White to move!" : "Black to move!"}</p>
                </span>
              </p>
              <div className="move-history">
                <p className="mr-2">Move history : </p>
                {moveHistory.map((move: any, index: number) => {
                  return (
                    <div key={index} className="move-history-item">
                      <p>{move.piece}{move.to},
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div >
      </div>
    </>
  );
}
