import { Server } from "socket.io";
import { server } from "..";

export const io = new Server(server);
