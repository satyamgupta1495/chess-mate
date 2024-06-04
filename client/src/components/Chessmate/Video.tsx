import { useEffect, useRef, useState } from 'react';
import { socket } from '../../Socket';
import Peer from 'peerjs';
import toast from 'react-hot-toast';
import { IoMdCall } from "react-icons/io";
import { MdCallEnd } from "react-icons/md";
import { MdMicOff, MdMic } from "react-icons/md";
import { FcNoVideo } from "react-icons/fc";

function Video({ startGame, roomId }: any) {

    const myPeerIdRef = useRef<any>(null);
    const opponentPeerIdRef = useRef<any>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [incomingCall, setIncomingCall] = useState<any>(null);
    const currVideoRef = useRef<any>(null);
    const peerRef = useRef<Peer | null>(null);
    const localStreamRef = useRef<MediaStream | null>(null);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (startGame) {
            const peer = new Peer();

            peer.on('open', (id) => {
                console.log('My peer ID is:', id);
                socket.emit('new_peer', { peerId: id, roomId: roomId });
                myPeerIdRef.current = id;
            });

            socket.on('new_peer', (data) => {
                console.log('New peer connected:', data);
                if (data.peerId !== opponentPeerIdRef.current) {
                    opponentPeerIdRef.current = data.peerId;
                }
            });

            peer.on('call', (call) => {
                console.log('Incoming call from...');
                setIncomingCall(call);
                toast((t) => (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <p className='text-black' style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Incoming video call...</p>
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
        }
    }, [startGame]);

    function callPeer() {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                localStreamRef.current = stream;
                console.log('Local stream:', stream);
                const call = peerRef.current?.call(opponentPeerIdRef.current, stream);
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
                localStreamRef.current = stream;
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
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(track => track.stop());
            localStreamRef.current = null;
        }
    }

    function toggleMute() {
        if (localStreamRef.current) {
            localStreamRef.current.getAudioTracks().forEach(track => {
                track.enabled = !track.enabled;
                setIsMuted(!track.enabled);
            });
        }
    }

    return (
        <div className='video-grid-container'>
            {remoteStream ? (
                <video
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
                <div className="no-video">
                    <FcNoVideo />
                </div>
            )}

            <div className="peer">
                <div className="call-btn">
                    <button onClick={callPeer}>
                        <IoMdCall />
                    </button>
                    {remoteStream &&
                        <>
                            <button onClick={endCall}>
                                <MdCallEnd />
                            </button>
                            <button onClick={toggleMute} className={isMuted ? 'muted' : ''}>
                                {isMuted ? <MdMicOff /> : <MdMic />}
                            </button>
                        </>
                    }

                </div>

            </div>
        </div>
    );
}

export default Video;
