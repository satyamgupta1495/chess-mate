
import { useEffect } from 'react';
import SimpleBoard from '../Boards/SimpleBoard'
import useChessMate from './hooks/useChessMate';
import Controls from '../Controls/Controls';
import Footer from '../Footer/Footer';
import { Container } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';

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
      <Container fluid className='d-flex  justify-content-between align-items-center flex-column height-100 main-container' >
        <div className="board-container">
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
        </div>
        <section className="footer-section">
          <Footer />
        </section>
      </Container >
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