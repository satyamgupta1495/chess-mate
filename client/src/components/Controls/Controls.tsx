import Form from 'react-bootstrap/Form';
import useControl from './hooks/useControl';


type ControlsProps = {
    setGame: any,
    setMode: any,
    mode: string
}

function Controls({ setGame, setMode, mode }: ControlsProps) {

    const { onSelect } = useControl({ setGame, setMode })
    return (
        <>
            <div className="controls">
                <Form.Select className='custom-select' aria-label="Default select" value={mode} onChange={onSelect}>
                    <option>Choose mode</option>
                    <option value="analyze">Two Players</option>
                    <option value="random">Computer</option>
                </Form.Select>
            </div>
        </>
    )
}

export default Controls