import { useState } from 'react';
import useControl from './hooks/useControl';
import logo from "../../assets/icon2.png"
import { Button } from 'react-bootstrap';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { IoColorPalette } from 'react-icons/io5';
import { FaUserFriends, FaRobot } from 'react-icons/fa';
import { FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';


type ControlsProps = {
    setGame: any,
    setMode: any,
    mode: string,
    currentTheme: string,
    setCurrTheme: any
}

function Controls({ setGame, setMode, setCurrTheme }: ControlsProps) {

    const { onThemeSelect } = useControl({ setGame, setMode, setCurrTheme })

    const [collapsed, setCollapsed] = useState(false);

    const [menu, setMenu] = useState({
        modeMenu: false,
        themeMenu: false
    })

    function handleMouseEnter(currentMenu: string) {
        setMenu({
            modeMenu: currentMenu === "Mode",
            themeMenu: currentMenu === "Theme"
        });
    }

    function handleMouseLeave() {
        setMenu({
            modeMenu: false,
            themeMenu: false
        })
    }

    function handleCollapse() {
        setCollapsed(!collapsed)
    }

    return (
        <>
            <div className="side-bar-container">
                <Sidebar rootStyles={{ border: "none" }}
                    collapsed={collapsed} transitionDuration={500}>
                    <div className='btn-container'>
                        <Button onClick={handleCollapse}>{collapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}</Button>
                        <div className="logo-container">
                            <h3><span><img src={logo}></img> </span>{!collapsed && "Chessmate"}</h3>
                        </div>

                    </div>
                    <Menu>
                        <MenuItem> <p onMouseEnter={() => handleMouseEnter("Mode")}> <span className='menu-icons'><GiArtificialIntelligence /></span>Mode</p></MenuItem>
                        <MenuItem> <p onMouseEnter={() => handleMouseEnter("Theme")}> <span className='menu-icons'><IoColorPalette /></span>Theme</p></MenuItem>
                    </Menu>
                </Sidebar>

                <div className="controls">
                    {menu.modeMenu &&
                        <div className="menu" onMouseLeave={handleMouseLeave}>
                            <Button value="Two Players" onClick={() => setMode("analyze")}>
                                <span className='menu-icons'><FaUserFriends /></span> Two Players</Button>
                            <Button value="Computer" onClick={() => setMode("random")}><span className='menu-icons'><FaRobot /></span> Computer</Button>
                        </div>
                    }

                    {menu.themeMenu &&
                        <div className="menu" onMouseLeave={handleMouseLeave}>
                            <Button value="Red" onClick={() => onThemeSelect("#769656")}>Default</Button>
                            <Button value="Red" onClick={() => onThemeSelect("red")}>Red</Button>
                            <Button value="Purple" onClick={() => onThemeSelect("purple")}>Purple</Button>
                            <Button value="Baby Pink" onClick={() => onThemeSelect("pink")}>Pink</Button>
                        </div>
                    }
                </div>


            </div >

            {/* <div className="side-bar">
                <div className="logo-container">
                    <h3><span><img src={logo}></img> </span>Chessmate</h3>
                </div>
                <div className="controls">
                    <div className="sidebar-options">
                        <p onMouseEnter={() => handleMouseEnter("Mode")}> <span className='menu-icons'><GiArtificialIntelligence /></span>Mode</p>
                        <p onMouseEnter={() => handleMouseEnter("Theme")}> <span className='menu-icons'><IoColorPalette /></span>Theme</p>
                    </div>

                    {menu.modeMenu &&
                        <>
                            <div className="menu" onMouseLeave={handleMouseLeave}>
                                <Button value="Two Players" onClick={() => setMode("analyze")}><span className='menu-icons'><FaUserFriends /></span> Two Players</Button>
                                <Button value="Computer" onClick={() => setMode("random")}><span className='menu-icons'><FaRobot /></span> Computer</Button>
                            </div>
                        </>
                    }

                    {menu.themeMenu &&
                        <>
                            <div className="menu" onMouseLeave={handleMouseLeave}>
                                <Button value="Red" onClick={() => onThemeSelect("#769656")}>Default</Button>
                                <Button value="Red" onClick={() => onThemeSelect("red")}>Red</Button>
                                <Button value="Purple" onClick={() => onThemeSelect("purple")}>Purple</Button>
                                <Button value="Baby Pink" onClick={() => onThemeSelect("pink")}>Pink</Button>
                            </div>
                        </>
                    }
                </div>
            </div > */}
        </>
    )
}

export default Controls