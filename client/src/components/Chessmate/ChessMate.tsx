
import SimpleBoard from '../Boards/SimpleBoard'
import Controls from '../Controls/Controls';
import useChessMate from './hooks/useChessMate';

function ChessMate() {

  const { game, mode, setMode, setGame } = useChessMate()

  return (
    <>
      <div className="container">
        <Controls setGame={setGame} setMode={setMode} mode={mode} />
        <SimpleBoard position={game.fen()} mode={mode} game={game} setGame={setGame} />
      </div >
    </>
  )
}

export default ChessMate