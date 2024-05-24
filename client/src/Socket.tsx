import { io } from 'socket.io-client';
import { URL } from '@/constants'
console.log("URL---", URL)
export const socket = io(URL);