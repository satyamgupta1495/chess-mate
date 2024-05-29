import useUserHook from './Chessmate/hooks/useUserHook';
import { useEffect } from 'react';
import NavBar from './Chessmate/NavBar';
import Background from '@/assets/img/bg.jpg'
import Footer from './Chessmate/Footer';
import { PiGameController } from "react-icons/pi";
import { GiLaurelsTrophy } from "react-icons/gi";
import { FaRegHandshake } from "react-icons/fa";
import { GiCrossedAxes } from "react-icons/gi";

function Profile() {
    const { user, userStats, getUserStats } = useUserHook()
    useEffect(() => {
        getUserStats()
    }, [])

    return (
        <>
            <div className="profile-wrapper show-top">
                <NavBar />
                <div className="profile-bg">
                    <img src={Background} />
                </div>
                <div className='user-info'>
                    <div className="profile-img-container">
                        <img src={user?.loggedInUser?.avatar} />
                    </div>
                    <div className="stats-container text-black">
                        {userStats && <>
                            <div className="d-flex data justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <PiGameController />
                                    <span className="ms-2">Match played</span>
                                </div>
                                <span>{parseInt(userStats?.wins) + parseInt(userStats?.draws) + parseInt(userStats?.losses)}</span>
                            </div>
                            <div className="d-flex data justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <GiLaurelsTrophy />
                                    <span className="ms-2">Wins</span>
                                </div>
                                <span>{parseInt(userStats?.wins)}</span>
                            </div>
                            <div className="d-flex data justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <GiCrossedAxes />
                                    <span className="ms-2">Losses</span>
                                </div>
                                <span>{parseInt(userStats?.losses)}</span>
                            </div>
                            <div className="d-flex data justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <FaRegHandshake />
                                    <span className="ms-2">Draws</span>
                                </div>
                                <span>{parseInt(userStats?.draws)}</span>
                            </div>
                        </>
                        }
                    </div>
                </div>
            </div>
            <div className="mt-12 show-top">
                <Footer />
            </div>
        </>
    );
}

export default Profile;