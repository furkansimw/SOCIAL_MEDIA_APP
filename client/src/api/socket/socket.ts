import { io } from "socket.io-client";
const socket = io(window.location.origin, { withCredentials: true });

export default socket;
