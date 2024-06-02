import { Suspense } from 'react'
import Footer from './Chessmate/Footer'
import Piece from './Chessmate/Piece'
import { Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import useChessStore from '@/store/useChessStore'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import logo from "@/assets/img/chessmate.png"

function Home() {
    const navigate = useNavigate()
    const { user }: any = useChessStore((state) => state)

    return (
        <div className='home_wrapper'>
            <Navbar className='w-100 my-1' data-bs-theme="dark">
                <div className='w-100 nav_wrapper'>
                    <Navbar.Brand href="/" className="d-flex align-items-center">
                        <span className='h-8 w-8 rounded-full bg-amber-400 mr-2'> <img src={logo} alt="img" /></span>
                        <span>Chessmate</span>
                    </Navbar.Brand>
                    <Nav className="nav_home">
                        {!user?.loggedInUser && <>
                            <button className="button-glow mx-4" style={{ fontSize: "1.5rem" }} onClick={() => {
                                console.log("login")
                                navigate('/login')
                            }}>
                                <span className="actual-text">&nbsp;Login&nbsp;</span>
                                <span aria-hidden="true" className="hover-text">&nbsp;Login&nbsp;</span>
                            </button>
                            <button className="button-glow" style={{ fontSize: "1.5rem" }} onClick={() => { navigate('/signup') }}>
                                <span className="actual-text">&nbsp;Signup&nbsp;</span>
                                <span aria-hidden="true" className="hover-text">&nbsp;Signup&nbsp;</span>
                            </button>
                        </>
                        }
                        {user?.loggedInUser?.avatar &&
                            < Avatar className="cursor-pointer border-solid border-2 border-white-500" onClick={() => navigate("/profile")}>
                                <AvatarImage src={user?.loggedInUser?.avatar} />
                            </Avatar>
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
                <Suspense fallback={<div className="relative flex justify-center items-center w-100 h-100 text-white"> Loading... </div>}>
                    <Piece />
                </Suspense>
            </section>
            <Footer />
        </div >
    )
}

export default Home