import { ILast } from "../interfaces/IApi";
import req from "./req";

export const getRooms = (requests: boolean, last?: ILast) =>
  req(
    `/messages/rooms?requests=${requests}&date=${last?.date}&id=${last?.id}`
  ).then((r) => r as any);

export const startRoom = (userid: string) =>
  req(`/messages/start`, "POST", { userid }).then((r: any) => r as string);

export const sendMessage = (
  roomid: string,
  content: string,
  type: 0 | 1 | 2 | 3,
  reply?: string
) =>
  req(`/messages/rooms/${roomid}`, "POST", {
    type,
    content,
    reply,
  });
