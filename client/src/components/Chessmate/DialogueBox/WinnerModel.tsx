import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import WinnerImg from '../../../assets/img/Winner2.svg'
import Fail from '../../../assets/img/loose.png'
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import { Chess } from 'chess.js';

function WinnerModel({ winner, orientation, setGame, setPosition }: any) {

    const navigate = useNavigate()
    const [show, setShow] = useState(false)

    console.log("winnnerrrr", winner, orientation)

    useEffect(() => {
        if (winner && winner?.winner !== "") {
            setShow(true);
        }
    }, [winner]);

    const isWinner = (winner === 'w' && orientation === 'white') || (winner === 'b' && orientation === 'black');
    const winnerMessage = winner === 'w' ? "White wins 👏" : winner === 'b' ? "Black wins 👏" : "No winner yet";

    return (
        <>
            {show && isWinner && <Confetti
                width={window.innerWidth - 10}
                height={window.innerHeight - 10}
            />}

            <Modal
                centered
                autoFocus
                size="lg"
                show={show}
                backdrop={false}
                onHide={() => setShow(false)}
                contentClassName="winner-modal"
            >
                <div className="custom-dialogue-box">
                    <Modal.Body>
                        <p className="h2 text-center my-2">
                            {winnerMessage}
                        </p>
                        <div className="trophy-container my-5">
                            <img src={isWinner ? WinnerImg : Fail} alt="Winner" />
                        </div>
                        <div className='winner-btn-container my-2'>
                            <button className="modal-button show-top mx-4" onClick={() => {
                                setShow(false)
                                setPosition("start")
                                setGame(new Chess())
                            }}>New game</button>
                            <button className="modal-button show-top mx-4" onClick={() => {
                                setShow(false)
                                navigate("/")
                            }}>Home</button>
                        </div>
                    </Modal.Body>
                </div >
            </Modal >
        </>
    )
}

export default WinnerModel