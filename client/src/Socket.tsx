import { io } from 'socket.io-client';


// const URL = "http://localhost:3000"
const URL = window.location.hostname === 'localhost' ? "http://localhost:3000" :  "http://chess-mate.me"

export const socket = io(URL);