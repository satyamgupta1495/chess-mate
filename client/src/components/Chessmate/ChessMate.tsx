
import { useEffect } from 'react';
import SimpleBoard from './SimpleBoard'
import useChessMate from './hooks/useChessMate';
import Footer from './Footer';
import NavBar from './NavBar';

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
      <div className='chess-mate'>
        <NavBar
          currentTheme={currTheme}
          setCurrTheme={setCurrTheme}
          setMode={setMode}
        />

        < SimpleBoard
          position={position}
          setPosition={setPosition}
          mode={mode}
          setMode={setMode}
          game={game}
          setGame={setGame}
          currentTheme={currTheme}
          currentTurn={currentTurn}
          setCurrentTurn={setCurrentTurn} />

        <Footer />
      </div>
    </>
  )
}

export default ChessMate