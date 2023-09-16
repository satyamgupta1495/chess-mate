import { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { TbChessQueen, TbChessQueenFilled } from "react-icons/tb";
import { FaRandom } from 'react-icons/fa'
import toast from 'react-hot-toast';

type Props = {
    show?: boolean,
    onHide?: any,
    setRoomType: (roomType: { type: string, roomName: string, selectedColor?: string }) => void;
}

export default function CustomDialogueBox({ setRoomType }: Props) {

    const [createRoomId, setCreateRoomId] = useState('')
    const [show, setShow] = useState(true)
    const [playAs, setPlayAs] = useState<any>()



    const handleCreateRoom = () => {
        if (createRoomId === '') return alert('Please enter a room id')
        setShow(false)
        const selectedColor = playAs === 'r' ? (Math.random() < 0.5 ? 'w' : 'b') : playAs;
        console.log(selectedColor, "selectedColor")
        if (!selectedColor) alert('Please select a color')
        setRoomType({ type: 'create', roomName: createRoomId, selectedColor: selectedColor ? selectedColor : 'w' });
    }
    const handleJoinRoom = () => {
        if (createRoomId === '') return alert('Please enter a room id')
        setRoomType({ type: 'join', roomName: createRoomId })
        setShow(false)
    }

    const handlePlayAs = (color: string) => {
        if (color === 'b') {
            setPlayAs('b')
            toast.success('You ll be playing as Black 🖤')
        } else if (color === 'w') {
            setPlayAs('w')
            toast.success('You ll be playing as White 🤍')
        } else {
            setPlayAs('r')
            toast.success('Psstt... its a surprise 🤫')
        }
    }

    return (
        <>
            <Modal
                show={show}
                size="lg"
                onHide={() => setShow(false)}
                centered
            >
                <div className="custom-dialogue-box">
                    <Modal.Body>
                        <p className="h2 text-center my-2">
                            Create or Join a Room</p>
                        <div className='play-as d-flex flex-row justify-content-center align-items-center'>
                            <span className='fs-5'>Play as : </span>
                            <button className={`mx-2 fs-5  ${playAs === 'b' ? 'active-btn' : ''}`} onClick={() => { handlePlayAs('b') }} > <TbChessQueen /> </button>
                            <button className={`mx-2 fs-5 ${playAs === 'r' ? 'active-btn' : ''}`} onClick={() => { handlePlayAs('r') }} > <FaRandom /> </button>
                            <button className={`mx-2 fs-5 ${playAs === 'w' ? 'active-btn' : ''}`} onClick={() => { handlePlayAs('w') }} > <TbChessQueenFilled /> </button>
                        </div>

                        <InputGroup className="my-4 input">
                            <Form.Control
                                className='shadow-none '
                                placeholder="Enter room id..."
                                onChange={(e) => {
                                    setCreateRoomId(e.target.value)
                                }}
                            />
                        </InputGroup>
                        <div className='room-btn-container my-2'>
                            <button className="button-50" onClick={handleCreateRoom}>Create Room</button>
                            <button className="button-50" onClick={handleJoinRoom}>Join Room</button>
                        </div>
                    </Modal.Body>
                </div >
            </Modal >
        </>
    );
}
