import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import useSimpleBoard from "./hooks/useSimpleBoard";
import { Button } from "react-bootstrap";
import { Chess } from "chess.js";

type SimpleBoardProps = {
  mode?: string,
  position?: any,
  game?: any,
  setGame?: any,
  currentTheme?: string,
}

export default function SimpleBoard({ position, game, setGame, mode, currentTheme }: SimpleBoardProps) {

  const [boardWidth, setBoardWidth] = useState(window.innerWidth * 0.8);

  const { moveTo, showPromotionDialog, rightClickedSquares, moveSquares, optionSquares, onSquareClick, onPromotionPieceSelect, onSquareRightClick, setMoveSquares, setOptionSquares, setRightClickedSquares, onDrop } = useSimpleBoard({ game, setGame, mode })

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
        customDarkSquareStyle={{ backgroundColor: `${currentTheme}` || '#769656' }}
        customLightSquareStyle={{ backgroundColor: '#eeeed2' }}
        customBoardStyle={{ borderRadius: '5px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5 ' }}
        position={position}
        onPieceDrop={onDrop}

        onSquareClick={onSquareClick}
        onSquareRightClick={onSquareRightClick}
        onPromotionPieceSelect={onPromotionPieceSelect}
        customSquareStyles={{
          ...moveSquares,
          ...optionSquares,
          ...rightClickedSquares,
        }}
        promotionToSquare={moveTo}
        showPromotionDialog={showPromotionDialog}
      />
      <Button
        className="custom-btn reset-button"
        onClick={() => {
          setGame(new Chess());
          setMoveSquares({});
          setOptionSquares({});
          setRightClickedSquares({});
        }}
      >
        Reset
      </Button>

      {/* TODO: Add undo button */}

    </div>
  );
}