import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import WinnerImg from '../../../assets/img/Winner2.svg'
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';

function WinnerModel(winner: any) {

    const navigate = useNavigate()
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (winner?.winner !== "") {
            setShow(true);
        }
    }, [winner]);

    return (
        <>
            {show && <Confetti
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
                            {winner.winner === 'w' ? "White wins 👏" : (winner.winner === "b" ? "Black wins 👏" : "No winner yet")}
                        </p>
                        <div className="trophy-container my-5">
                            <img src={WinnerImg} alt="Winner" />
                        </div>
                        <div className='room-btn-container my-2'>
                            <button className="modal-button show-top mx-4" onClick={() => {
                                setShow(false)
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