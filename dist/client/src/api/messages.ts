import { ILast } from "../interfaces/IApi";
import { IMessage, IRoom } from "../interfaces/IMessages";
import { IPost } from "../interfaces/ISlices";
import req from "./req";

export const getRooms = (requests: boolean, last?: ILast) =>
  req(
    `/messages/rooms?requests=${requests}&date=${last?.date}&id=${last?.id}`
  ).then((r: any) => r);

export const getRoom = (roomid: string) =>
  req(`/messages/rooms/${roomid}`).then((a: any) => a);

export const startRoom = (userid: string) =>
  req(`/messages/start`, "POST", { userid }).then((r: any) => r as string);

export const sendMessage = (
  roomid: string,
  content: string,
  type: 0 | 1 | 2 | 3,
  reply: string | null,
  messageid: string
) =>
  req(`/messages/rooms/${roomid}`, "POST", {
    type,
    content,
    reply,
    messageid,
  }).then((r) => r as IMessage);

export const getMessages = (roomid: string, last?: ILast) =>
  req(
    `/messages/rooms/${roomid}/messages?date=${last?.date}&id=${last?.id}`
  ).then((r) => r as any[]);

export const getPostW = (postid: string) =>
  req(`/messages/post/${postid}`).then((a) => a as IPost);

export const deleteRoom = (roomid: string) =>
  req(`/messages/rooms/${roomid}`, "DELETE");
