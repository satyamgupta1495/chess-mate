import { useState } from 'react';
import { useRef, useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { TbChessQueen, TbChessQueenFilled } from "react-icons/tb";
import { FaRandom } from 'react-icons/fa'
import toast from 'react-hot-toast';
import { socket } from '../../../Socket';
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';

type Props = {
    show?: boolean,
    onHide?: any,
    setMode?: any,
    setRoomType: (roomType: { type: string, roomName: string, selectedColor?: string, peerId?: string }) => void;
}

export default function CustomDialogueBox({ setRoomType, setMode }: Props) {

    const navigate = useNavigate()

    const [createRoomId, setCreateRoomId] = useState('')
    const [show, setShow] = useState(true)
    const [playAs, setPlayAs] = useState<any>()
    const roomExists = useRef<any>(false);

    const handleCreateRoom = (): any => {
        if (createRoomId === '') return toast('Please enter room id 🚀')
        setShow(false)
        const selectedColor = playAs === 'r' ? (Math.random() < 0.5 ? 'w' : 'b') : playAs;
        setRoomType({ type: 'create', roomName: createRoomId, selectedColor: selectedColor ? selectedColor : 'w', });
    }

    const handleJoinRoom = (): any => {
        if (createRoomId === '') return toast('Please create or enter room id 🚀')
        setRoomType({ type: 'join', roomName: createRoomId })
        // console.log("roomExists", roomExists.current)

        // socket.emit('new_peer', { peerId: peer.id, socketId: socket.id })

        if (roomExists.current) {
            toast.error('Room not found 🤷‍♂️')
        } else {
            toast.success('Room found! 🤩')
            setShow(false)
        }
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

    const playWithComputer = () => {
        setShow(false)
        setMode("random")
    }

    //TODO : fix join empty room
    useEffect(() => {
        socket.on('roomNotFound', (data) => {
            if (!data?.canJoinRoom) {
                roomExists.current = false;
                setShow(true);
            } else {
                roomExists.current = true;
            }
        });
    });

    return (
        <>
            <Modal
                show={show}
                size="lg"
                onHide={() => setShow(false)}
                backdrop={"static"}
                centered
            >
                <div className="custom-dialogue-box">
                    <Modal.Body>
                        <p className="h2 text-center my-2">
                            Create or Join a Room</p>
                        <div className='play-as h1 d-flex flex-row justify-content-center align-items-center'>
                            <span className='fs-5'>Play as : </span>
                            <button className={` ${playAs === 'b' ? 'active-btn' : ''}`} onClick={() => { handlePlayAs('b') }} > <TbChessQueen /> </button>
                            <button className={`${playAs === 'r' ? 'active-btn' : ''}`} onClick={() => { handlePlayAs('r') }} > <FaRandom /> </button>
                            <button className={`${playAs === 'w' ? 'active-btn' : ''}`} onClick={() => { handlePlayAs('w') }} > <TbChessQueenFilled /> </button>
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
                        <div className='room-btn-container m-8'>
                            <button className="button-50 mx-4" onClick={playWithComputer}>Computer</button>
                            <button className="button-50 mx-4" onClick={handleCreateRoom}>Create Room</button>
                            <button className="button-50 mx-4" onClick={handleJoinRoom}>Join Room</button>
                        </div>
                        <div className="flex mt-4 text-xs justify-start items-center gap-1 cursor-pointer">
                            <span onClick={() => navigate('/')} className="flex gap-1 items-center">
                                <span className="text-xl">
                                    <HiMiniArrowLongLeft />
                                </span>
                                <span> Back home </span>
                            </span>
                        </div>
                    </Modal.Body>
                </div >
            </Modal >
        </>
    );
}
