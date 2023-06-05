import { io } from "socket.io-client";
const apiurl = import.meta.env.REACT_APP_API_URL || "http://localhost:4000";

const socket = io(apiurl, { withCredentials: true });

export default socket;
