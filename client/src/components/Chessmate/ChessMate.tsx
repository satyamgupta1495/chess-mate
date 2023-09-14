
import { useEffect } from 'react';
import SimpleBoard from '../Boards/SimpleBoard'
import useChessMate from './hooks/useChessMate';
import Controls from '../Controls/Controls';

function ChessMate() {

  const { game, mode, setMode, setGame, currTheme, setCurrTheme, currentTurn, setCurrentTurn, position, setPosition } = useChessMate()

  useEffect(() => {
    const selectedTheme = localStorage.getItem('theme')
    if (selectedTheme) {
      setCurrTheme(selectedTheme)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="container">
        <Controls
          setGame={setGame}
          setMode={setMode}
          mode={mode}
          currentTheme={currTheme}
          setCurrTheme={setCurrTheme} />

        < SimpleBoard
          position={position}
          setPosition={setPosition}
          mode={mode}
          game={game}
          setGame={setGame}
          currentTheme={currTheme}
          currentTurn={currentTurn}
          setCurrentTurn={setCurrentTurn} />
      </div >

    </>
  )
}

export default ChessMate