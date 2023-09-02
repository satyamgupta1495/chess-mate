import { Chess } from 'chess.js'

export default function useControl({ setGame, setMode, setCurrTheme }: any) {

    function onSelect(mode: any) {
        setMode(mode)
        setGame(new Chess())
    }

    function onThemeSelect(theme: any) {
        localStorage.setItem('theme', theme)
        setCurrTheme(theme)
    }

    return {
        onSelect, onThemeSelect, setCurrTheme
    }
}