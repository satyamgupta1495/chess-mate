import { Form } from 'react-bootstrap'
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
        <>
            <div className='chat-container mx-4 '>
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
                <div className="sender-area">
                    <div className="input-place w-100 mx-3">
                        <Form.Control className='shadow-none' size="sm" type="text" placeholder="Enter message..."
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') { sendChat() }
                            }}
                            value={message} onChange={(e) => setMessage(e.target.value)} style={{ backgroundColor: "transparent" ,color:"white"}} />
                        <div className="send">
                            <svg
                                className="send-icon"
                                version="1.1"
                                id="Capa_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 512 512"
                                xmlSpace="preserve"
                                onClick={sendChat}
                            >
                                <g>
                                    <g>
                                        <path
                                            fill="#6B6C7B"
                                            d="M481.508,210.336L68.414,38.926c-17.403-7.222-37.064-4.045-51.309,8.287C2.86,59.547-3.098,78.551,1.558,96.808 L38.327,241h180.026c8.284,0,15.001,6.716,15.001,15.001c0,8.284-6.716,15.001-15.001,15.001H38.327L1.558,415.193 c-4.656,18.258,1.301,37.262,15.547,49.595c14.274,12.357,33.937,15.495,51.31,8.287l413.094-171.409 C500.317,293.862,512,276.364,512,256.001C512,235.638,500.317,218.139,481.508,210.336z"
                                        ></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Chat