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
            <div className='chat-container'>
                <div className="chat-header">
                    {chat.map((chatData: any, index: number) => {
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
                    <div className="messageBox">
                        <input className='w-100' placeholder="Message..." type="text" id="messageInput" onKeyDown={(e) => {
                            if (e.key === 'Enter') { sendChat() }
                        }} value={message} onChange={(e) => setMessage(e.target.value)} style={{ backgroundColor: "transparent", color: "white" }} />
                        <button id="sendButton" onClick={() => sendChat()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
                                <path
                                    fill="none"
                                    d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                                ></path>
                                <path
                                    stroke-linejoin="round"
                                    stroke-linecap="round"
                                    stroke-width="33.67"
                                    stroke="#6c6c6c"
                                    d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                                ></path>
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Chat