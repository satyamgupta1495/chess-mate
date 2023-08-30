import Form from 'react-bootstrap/Form';
import useControl from './hooks/useControl';


type ControlsProps = {
    setGame: any,
    setMode: any,
    mode: string,
    currentTheme: string,
    setCurrTheme: any
}

function Controls({ setGame, setMode, mode, currentTheme, setCurrTheme }: ControlsProps) {

    const { onSelect, onThemeSelect } = useControl({ setGame, setMode, setCurrTheme })
    return (
        <>
            <div className="controls">
                <Form.Select className='custom-select' aria-label="Default select" value={mode} onChange={onSelect}>
                    <option>Choose mode</option>
                    <option value="analyze">Two Players</option>
                    <option value="random">Computer</option>
                </Form.Select>

                <Form.Select className='custom-select' aria-label="Default select" value={currentTheme} onChange={onThemeSelect}>
                    <option>Choose theme</option>
                    <option value="red">Red</option>
                    <option value="purple">Purple</option>
                    <option value="pink">Baby Pink</option>
                </Form.Select>
            </div>
        </>
    )
}

export default Controls