import { Chess } from 'chess.js'

export default function useControl({ setGame, setMode, setCurrTheme }: any) {

    function onSelect(e: any) {
        setMode(e.target.value)
        setGame(new Chess())
    }

    function onThemeSelect(e: any) {
        setCurrTheme(e.target.value)
    }

    return {
        onSelect, onThemeSelect, setCurrTheme
    }
}