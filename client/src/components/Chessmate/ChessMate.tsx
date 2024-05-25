
import { useEffect } from 'react';
import SimpleBoard from './SimpleBoard'
import useChessMate from './hooks/useChessMate';
import Footer from './Footer';
// import { Container } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';
import NavBar from './NavBar';

function ChessMate() {

  const { game, mode, setGame, currTheme, setCurrTheme, currentTurn, setCurrentTurn, position, setPosition } = useChessMate()

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

        <Footer />
      </div >

      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          style: {
            fontSize: '14px',
            border: '1px dashed white',
            color: '#000'
          }
        }}
      />
    </>
  )
}

export default ChessMate