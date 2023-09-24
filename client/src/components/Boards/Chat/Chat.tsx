import { Container, Form } from 'react-bootstrap'
// import { FaArrowCircleDown, FaArrowCircleUp } from 'react-icons/fa';
import { useEffect, useRef } from 'react';

type ChatProps = {
    chat: any,
    sendChat: any,
    message: any,
    setMessage: any
}

function Chat({ chat, sendChat, message, setMessage }: ChatProps) {
    const chatEndRef: any = useRef(null);

    useEffect(() => {
        chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [chat])

    return (
        <div className='w-100 px-1'>
            <div className="chat-header">
                {chat.map((chatData: any, index: number) => {
                    console.log(chatData, "dasdas")
                    return (
                        <div key={index} className={`chat-message ${chatData.type}`}>
                            <div className="chat-icon d-flex align-items-center">
                                <span className='text-white'>
                                    {chatData.type === 'received' &&
                                        <div className='msg-div received my-1'>
                                            <p className='m-2'>  {chatData?.message}</p>
                                            <span>{new Date(chatData?.time).toLocaleTimeString()}</span>
                                        </div>
                                    }
                                </span>
                                <span className='text-white mx-2'>
                                    {chatData.type === 'sent' &&
                                        <div className='msg-div sent my-1'>
                                            <p className='m-2'>{chatData?.message}</p>
                                            <span>{new Date(chatData?.time).toLocaleTimeString()}</span>
                                        </div>
                                    }
                                </span>
                            </div>
                        </div>
                    )
                })}
                <div ref={chatEndRef} />
            </div>
            <div className="chat-input">
                <Form.Control className='shadow-none' size="sm" type="text" placeholder="Enter message..."
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') { sendChat() }
                    }}
                    value={message} onChange={(e) => setMessage(e.target.value)} />
                <button className="custom-btn" onClick={sendChat}>Send</button>
            </div>

            {/* <div className="control-btns">
                <Button
                    className="custom-btn reset-button mb-5"
                    onClick={() => {
                        setGame(new Chess());
                        setMoveSquares({});
                        setOptionSquares({});
                        setRightClickedSquares({});
                        setCurrentTurn("w");
                    }}
                >
                    Reset
                </Button>
            </div> */}
        </div>
    )
}

export default Chat