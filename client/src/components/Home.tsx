import React, { Suspense } from 'react'
import Footer from './Chessmate/Footer'
import Piece from './Chessmate/Piece'
import { Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import useChessStore from '@/store/useChessStore'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import logo from "@/assets/img/chessmate.png"
import { IoLogOutOutline } from "react-icons/io5";
import { logoutUser } from '@/helper'
import toast from 'react-hot-toast'

function Home() {
    const navigate = useNavigate()
    const { user, logout }: any = useChessStore((state) => state)

    const handleLogout = async () => {
        logout();
        navigate('/');
        try {
            const response = await logoutUser();
            if (response?.data?.success) {
                toast.success("Logged out successfully!");
            } else {
                toast.error("Something went wrong!");
            }
        } catch (error) {
            toast.error("An error occurred during logout");
            console.error("Logout error:", error);
        }
    };

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
                            <div className="sign-up-container">
                                <button className="button-glow mx-4" style={{ fontSize: "1.5rem" }} onClick={() => {
                                    navigate('/login')
                                }}>
                                    <span className="actual-text">&nbsp;Login&nbsp;</span>
                                    <span aria-hidden="true" className="hover-text">&nbsp;Login&nbsp;</span>
                                </button>
                                <button className="button-glow" style={{ fontSize: "1.5rem" }} onClick={() => { navigate('/signup') }}>
                                    <span className="actual-text">&nbsp;Signup&nbsp;</span>
                                    <span aria-hidden="true" className="hover-text">&nbsp;Signup&nbsp;</span>
                                </button>
                            </div>
                        </>
                        }
                        {user?.loggedInUser?.avatar &&
                            <>
                                <div className="flex justify-center items-center">
                                    < Avatar className="cursor-pointer border-solid border-2 border-white-500" onClick={() => navigate("/profile")}>
                                        <AvatarImage src={user?.loggedInUser?.avatar} />
                                    </Avatar>
                                    <div className="logout-icon ml-4 mt-1 flex justify-center items-center h3 rounded-full p-2  cursor-pointer bg-violet-950  hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300" onClick={handleLogout}>
                                        <IoLogOutOutline />
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
                <Suspense fallback={<div className="relative flex justify-center items-center w-100 h-100 text-white">
                    {React.createElement('l-trefoil', {
                        size: "40",
                        stroke: "4",
                        strokeLength: "0.15",
                        bgOpacity: "0.1",
                        speed: "1.4",
                        color: "white"
                    })}
                </div>
                }>
                    <Piece />
                </Suspense>
            </section>
            <Footer />
        </div >
    )
}

export default Home