import { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

type Props = {
    show?: boolean,
    onHide?: any,
    setRoomType: (roomType: { type: string, roomName: string, selectedColor?: string }) => void;
}

export default function CustomDialogueBox({ setRoomType }: Props) {

    const [createRoomId, setCreateRoomId] = useState('')
    const [show, setShow] = useState(true)
    const handleCreateRoom = () => {
        setRoomType({ type: 'create', roomName: createRoomId, selectedColor: 'b' })
    }
    const handleJoinRoom = () => {
        setRoomType({ type: 'join', roomName: createRoomId })
        setShow(false)
    }


    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title
                    className="text-center">
                    Create OR Join a Room
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <Form.Control
                        className='shadow-none border-1-0'
                        placeholder="Enter Room Id/Name..."
                        onChange={(e) => {
                            setCreateRoomId(e.target.value)
                        }}
                    />
                </InputGroup>
                <div className='room-btn-container'>
                    <Button variant="primary" className="w-25" onClick={handleCreateRoom}>Create Room</Button>
                    <Button variant="success" className="w-25" onClick={handleJoinRoom}>Join Room</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}
