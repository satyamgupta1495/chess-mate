import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

function PlayerDisconnected() {
    const navigate = useNavigate()
    const [show, setShow] = useState(true)

    return (
        <Modal
            centered
            autoFocus
            size="lg"
            show={show}
            backdrop={"static"}
            onHide={() => setShow(false)}
            contentClassName="winner-modal"
        >
            <div className="custom-dialogue-box">
                <Modal.Body>
                    <p className="h4 text-center my-2">
                        Opponent left the game...
                    </p>
                    <div className='room-btn-container my-4'>
                        <button className="modal-button show-top mx-4" onClick={() => {
                            setShow(false)
                            navigate("/")
                        }}>Back</button>
                    </div>
                </Modal.Body>
            </div >
        </Modal >
    )
}

export default PlayerDisconnected