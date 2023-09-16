import { io } from 'socket.io-client';


// const hostname: string = window.location.hostname;
// const URL = "http://localhost:3000"
const URL = "http://chess-mate.me"
// const URL = (hostname === 'localhost' || hostname === '127.0.0.1') ? "http://localhost:3000" : "http://chess-mate.me"


export const socket = io(URL);