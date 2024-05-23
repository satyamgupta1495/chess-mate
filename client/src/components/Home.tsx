import Footer from './Footer/Footer'
import Piece from './3Dmodels/Piece'
import { Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import useChessStore from '@/store/useChessStore'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { logoutUser } from '@/helper'

function Home() {
    const navigate = useNavigate()
    const { user, logout }: any = useChessStore((state) => state)

    const handleLogout = () => {
        logoutUser()
        logout()
    }

    return (
        <div className='home_wrapper'>
            <Navbar className='w-100 ' data-bs-theme="dark">
                <div className='w-100 nav_wrapper'>
                    <Navbar.Brand href="#home">Chessmate</Navbar.Brand>
                    <Nav className="nav_home">
                        <button className="button-glow" style={{ fontSize: "1.5rem" }} onClick={() => { navigate('/play') }}>
                            <span className="actual-text">&nbsp;PLAY&nbsp;</span>
                            <span aria-hidden="true" className="hover-text">&nbsp;PLAY&nbsp;</span>
                        </button>
                        {!user?.loggedInUser?._id && <button className="button-glow" style={{ fontSize: "1.5rem" }} onClick={() => { navigate('/login') }}>
                            <span className="actual-text">&nbsp;Login&nbsp;</span>
                            <span aria-hidden="true" className="hover-text">&nbsp;Login&nbsp;</span>
                        </button>}
                        {user?.loggedInUser?._id &&
                            <> <div className="flex gap-3 align-items-center justify-content-center user-profile">
                                <div className="profile-container">
                                    <Avatar className="mx-2 mt-1" onClick={() => alert("hiii")}>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                    </Avatar>
                                    <span className='user-name'>{user?.loggedInUser?.userName || ""}</span>
                                </div>
                                <div className="logout-btn">
                                    <button onClick={handleLogout}>
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                            </>
                        }
                    </Nav>
                </div>
            </Navbar>

            <section className='home_page_container'>
                <div className="text_container" >
                    <p className='rubik-regular'>PLAY,</p>
                    <p className='rubik-scribble'>CHAT,</p>
                    <p className='rubik-regular'>CHECK<span className='rubik-scribble'>MATE!</span></p>
                    <button className="button-glow" style={{ fontSize: "3rem" }} onClick={() => { navigate('/play') }}>
                        <span className="actual-text">&nbsp;START&nbsp;</span>
                        <span aria-hidden="true" className="hover-text">&nbsp;START&nbsp;</span>
                    </button>
                </div>
                <Piece />
            </section>

            <Footer />
        </div>
    )
}

export default Home