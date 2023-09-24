import { useEffect, useRef, useState } from 'react';
import { socket } from '../../Socket';
import Peer from 'peerjs';
import toast from 'react-hot-toast';
import { FaCopy } from 'react-icons/fa';

function Video() {
    const [peerId, setPeerId] = useState<string>('');
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const currVideoRef = useRef<any>(null);
    const peerRef = useRef<Peer | null>(null);
    
    useEffect(() => {
        const peer = new Peer();
        peer.on('open', (id) => {
            console.log('My peer ID is:', id);
            socket.emit('new_peer', { peerId: id });
            // setPeerId(id);
        });

        socket.on('new_peer', (data) => {
            console.log('new_peer', data);
            setPeerId(data.peerId);
        });

        peer.on('call', (call) => {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    console.log('Local stream:', stream);
                    call.answer(stream);
                    call.on('stream', (remoteStream) => {
                        console.log('Remote stream:', remoteStream);
                        setRemoteStream(remoteStream);
                    });
                })
                .catch((err) => {
                    console.error('Failed to get local stream', err);
                });
        });

        peer.on('error', (err) => {
            console.error('Peer error:', err);
        });

        peerRef.current = peer;
    }, []);

    function callPeer() {
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

    function endCall() {
        peerRef.current?.disconnect();
        setRemoteStream(null);
    }

    function handleCopy() {
        navigator.clipboard.writeText(peerId);
        toast.success('Id copied');
    }

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
                        }
                    }}
                    autoPlay
                />
            ) : (
                <p>No remote stream available</p>
            )}
            <input type='text' value={peerId} onChange={(e) => setPeerId(e.target.value)} />
            <p className='text-white fs-1'><FaCopy onClick={handleCopy} /></p>
            
            <button onClick={callPeer}>Call</button>
            <button onClick={endCall}>Call End</button>
        </div>
    );
}

export default Video;