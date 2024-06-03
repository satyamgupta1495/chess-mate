import { useEffect, useRef, useState } from 'react';
import { socket } from '../../Socket';
import Peer from 'peerjs';
import toast from 'react-hot-toast';
// import { FaCopy } from 'react-icons/fa';

function Video() {
    const [myPeerId, setMyPeerId] = useState<string>('');
    const [peerId, setPeerId] = useState<string>('');
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [incomingCall, setIncomingCall] = useState<any>(null);
    // const [callingPeerId, setCallingPeerId] = useState<string>('');
    const currVideoRef = useRef<any>(null);
    const peerRef = useRef<Peer | null>(null);

    useEffect(() => {
        const peer = new Peer();

        peer.on('open', (id) => {
            console.log('My peer ID is:', id);
            setMyPeerId(id);
        });

        socket.on('new_peer', (data) => {
            console.log('New peer connected:', data);
            if (data.peerId !== peerId) {
                setPeerId(data.peerId);
            }
        });

        peer.on('call', (call) => {
            console.log('Incoming call from:', call.peer);
            setIncomingCall(call);
            // setCallingPeerId(call.peer);
            toast((t) => (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p className='text-black' style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Incoming call from {call.peer}</p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            className='btn btn-success'
                            onClick={() => {
                                acceptCall(call);
                                toast.dismiss(t.id);
                            }}
                        >
                            Accept
                        </button>
                        <button
                            className='btn btn-danger'
                            onClick={() => {
                                call.close();
                                toast.dismiss(t.id);
                            }}
                        >
                            Reject
                        </button>
                    </div>
                </div>
            ), { duration: Infinity });
        });

        peer.on('error', (err) => {
            console.error('Peer error:', err);
        });

        peerRef.current = peer;
    }, [peerId]);

    function callPeer() {
        socket.emit('new_peer', { peerId: myPeerId });
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                console.log('Local stream:', stream);
                const call = peerRef.current?.call(peerId, stream);
                call?.on('stream', (remoteStream) => {
                    console.log('Remote stream:', remoteStream);
                    setRemoteStream(remoteStream);
                });
            })
            .catch((err) => {
                console.error('Failed to get local stream', err);
            });
    }

    function acceptCall(call: any) {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                console.log('Answering call with local stream:', stream);
                call.answer(stream);
                call.on('stream', (remoteStream) => {
                    console.log('Remote stream:', remoteStream);
                    setRemoteStream(remoteStream);
                });
                call.on('close', () => {
                    console.log('Call ended');
                    setRemoteStream(null);
                });
                setIncomingCall(null);
            })
            .catch((err) => {
                console.error('Failed to get local stream', err);
            });
    }

    function endCall() {
        peerRef.current?.disconnect();
        setRemoteStream(null);
        if (incomingCall) {
            incomingCall.close();
            setIncomingCall(null);
        }
    }

    // function handleCopy() {
    //     navigator.clipboard.writeText(myPeerId);
    //     toast.success('ID copied');
    // }

    return (
        <div className='video-grid-container'>
            {remoteStream ? (
                <video
                    width='100%'
                    height='100%'
                    className='video-grid'
                    ref={(video: HTMLVideoElement | null) => {
                        if (video) {
                            currVideoRef.current = video;
                            currVideoRef.current.srcObject = remoteStream;
                            currVideoRef.current.play().catch(err => console.error('Failed to play video:', err));
                        }
                    }}
                    autoPlay
                />
            ) : (
                <p>No remote stream available</p>
            )}

            <div className="peer">
                <p>Your ID: {myPeerId}</p>
                <p>Opponent ID: {peerId}</p>

                <div className="call-btn">
                    <button onClick={callPeer}>Call</button>
                    <button onClick={endCall}>End Call</button>
                </div>
            </div>
        </div>
    );
}

export default Video;
