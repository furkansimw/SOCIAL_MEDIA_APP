import { ILast } from "../interfaces/IApi";
import { IMessage, IRoom } from "../interfaces/IMessages";
import req from "./req";

export const getRooms = (requests: boolean, last?: ILast) =>
  req(
    `/messages/rooms?requests=${requests}&date=${last?.date}&id=${last?.id}`
  ).then((r: any) => {
    r as any[];
    r = r.map((xd: any) => ({
      ...xd,
      messages: [],
      hasmore: true,
      loading: false,
    }));
    return r;
  });

export const getRoom = (roomid: string) =>
  req(`/messages/rooms/${roomid}`).then((a: any) => {
    const x: IRoom = { ...a, messages: [], hasmore: true, loading: false };
    return x;
  });

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
  }).then((r) => r as IMessage);

export const getMessages = (roomid: string, last?: ILast) =>
  req(
    `/messages/rooms/${roomid}/messages?date=${last?.date}&id=${last?.id}`
  ).then((r) => r as any[]);
