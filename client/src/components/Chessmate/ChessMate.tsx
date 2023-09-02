
import { useEffect } from 'react';
import SimpleBoard from '../Boards/SimpleBoard'
import Controls from '../Controls/Controls';
import useChessMate from './hooks/useChessMate';

function ChessMate() {

  const { game, mode, setMode, setGame, currTheme, setCurrTheme, currentTurn, setCurrentTurn } = useChessMate()

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
        <Controls setGame={setGame} setMode={setMode} mode={mode} currentTheme={currTheme} setCurrTheme={setCurrTheme} />
        <SimpleBoard position={game.fen()} mode={mode} game={game} setGame={setGame} currentTheme={currTheme} currentTurn={currentTurn} setCurrentTurn={setCurrentTurn} />
      </div >

    </>
  )
}

export default ChessMate