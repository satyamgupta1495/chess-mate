import { useState } from 'react';
import useControl from './hooks/useControl';
import { Button, Offcanvas } from 'react-bootstrap';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { IoColorPalette } from 'react-icons/io5';
import { FaUserFriends, FaRobot } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';


type ControlsProps = {
    setGame: any,
    setMode: any,
    mode: string,
    currentTheme: string,
    setCurrTheme: any
}

function Controls({ setGame, setMode, setCurrTheme }: ControlsProps) {

    const { onThemeSelect } = useControl({ setGame, setMode, setCurrTheme })

    // const [collapsed, setCollapsed] = useState(false);
    const [show, setshow] = useState(false);

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

    function handleClose() {
        setshow(!show)
    }

    return (
        <>
            <div className='btn-container'>
                <Button onClick={handleClose}>
                    <RxHamburgerMenu />
                </Button>
            </div>
            <div className="side-bar-container">
                <Offcanvas className="offcanvas" show={show} onHide={handleClose} styles={{ canvas: { width: '10px' } }}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title className='offcanvas-header' >Chessmate</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className='offcanvas-body'>

                        <div className="sidebar-options">
                            <div className='main-menu'>
                                <p onMouseEnter={() => handleMouseEnter("Mode")}> <span className='menu-icons'><GiArtificialIntelligence /></span>Mode</p>
                                <p onMouseEnter={() => handleMouseEnter("Theme")}> <span className='menu-icons'><IoColorPalette /></span>Theme</p>
                            </div>
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
                        </div>

                    </Offcanvas.Body>


                </Offcanvas>




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