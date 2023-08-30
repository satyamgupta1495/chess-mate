
import SimpleBoard from '../Boards/SimpleBoard'
import Controls from '../Controls/Controls';
import useChessMate from './hooks/useChessMate';

function ChessMate() {

  const { game, mode, setMode, setGame, currTheme, setCurrTheme } = useChessMate()

  return (
    <>
      <div className="container">
        <Controls setGame={setGame} setMode={setMode} mode={mode} currentTheme={currTheme} setCurrTheme={setCurrTheme} />
        <SimpleBoard position={game.fen()} mode={mode} game={game} setGame={setGame} currentTheme={currTheme} />
      </div >
    </>
  )
}

export default ChessMate