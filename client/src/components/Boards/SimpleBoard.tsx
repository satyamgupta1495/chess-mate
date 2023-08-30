import { Chessboard } from "react-chessboard";

type SimpleBoardProps = {
  onPieceDrop?: any,
  position?: any
}

export default function SimpleBoard({ onPieceDrop, position }: SimpleBoardProps) {
  return (
    <div className="chess-board">
      <h1>Chess-mate♟️</h1>
      <Chessboard id="BasicBoard"
        boardWidth={560}
        customDarkSquareStyle={{ backgroundColor: '#769656' }}
        customLightSquareStyle={{ backgroundColor: '#eeeed2' }}
        customBoardStyle={{ borderRadius: '5px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5 ' }}
        position={position}
        onPieceDrop={onPieceDrop}
      />
    </div>
  );
}