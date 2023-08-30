import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
// import useSimpleBoard from "./hooks/useSimpleBoard";

type SimpleBoardProps = {
  onPieceDrop?: any,
  position?: any,
}

export default function SimpleBoard({ onPieceDrop, position }: SimpleBoardProps) {

  const [boardWidth, setBoardWidth] = useState(window.innerWidth * 0.8);

  // const { onSquareClick, onSquareRightClick, showPromotionDialog, } = useSimpleBoard()

  function handleResize() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const minDimension = Math.min(windowWidth, windowHeight);
    const boardWidth = Math.floor(minDimension * 0.8);
    setBoardWidth(boardWidth);
  }

  useEffect(() => {

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="chess-board">
      <p>♟️Chess-mate</p>
      <Chessboard id="BasicBoard"
        boardWidth={boardWidth}
        customDarkSquareStyle={{ backgroundColor: '#769656' }}
        customLightSquareStyle={{ backgroundColor: '#eeeed2' }}
        customBoardStyle={{ borderRadius: '5px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5 ' }}
        position={position}
        onPieceDrop={onPieceDrop}
      />
    </div>
  );
}