import { upload } from "../db/cloudinary";
import conv from "../functions/converter";
import { v4 } from "uuid";
import { asyncErrorWrapper, badRequest } from "../mw/error";
import {
  getRoomsQ,
  startRoomQ,
  getRoomQ,
  sendMessageQ,
  selectReplyForMessage,
  getMessagesQ,
  deleteMessageQ,
  getPostWQ,
  deleteRoomQ,
} from "../queries/messagesQ";
import { findS, io } from "..";

const getRooms = asyncErrorWrapper(async (req, res) => {
  const { id } = res.locals;
  const { requests } = req.query;
  const rooms = await getRoomsQ(
    id,
    (requests as any) == "true",
    conv(req.query)
  );
  res.json(rooms);
});

const startRoom = asyncErrorWrapper(async (req, res) => {
  const { id } = res.locals;
  const { userid } = req.body;
  const result = await startRoomQ(id, userid);
  res.json(result);
});

const getRoom = asyncErrorWrapper(async (req, res) => {
  const { id } = res.locals;
  const { roomid } = req.params;

  const result = await getRoomQ(id, roomid);
  res.json(result);
});

const sendMessage = asyncErrorWrapper(async (req, res) => {
  const { id } = res.locals;
  const { roomid } = req.params;
  let { content, type, reply, messageid } = req.body;

  type = parseInt(type);
  if (!(type >= 0 && type <= 3)) badRequest();

  if (type == 3) {
    if (!reply) badRequest();
    const a = await selectReplyForMessage((reply as string).substring(0, 36));
    if (a == null) badRequest();
    reply = `${a.id}-${a.content}`;
  }

  if (type == 1) {
    try {
      content = await upload(content, messageid, "messages");
    } catch (error) {
      res.json(error);
      return;
    }
  }

  const result = await sendMessageQ(
    id,
    roomid,
    content,
    type,
    messageid,
    reply
  );

  if (result != undefined && result.userid != id)
    io.to(findS(result.userid)).emit("message", result);

  res.json(result);
});

const getMessages = asyncErrorWrapper(async (req, res) => {
  const { id } = res.locals;
  const { roomid } = req.params;

  const result = await getMessagesQ(id, roomid, conv(req.query));
  const messages = result.sort(
    (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()
  );
  res.json(messages);
});

const deleteMessage = asyncErrorWrapper(async (req, res) => {
  const { id } = res.locals;
  const { roomid, messageid } = req.params;

  const result = await deleteMessageQ(id, roomid, messageid);
  res.json(result);
});

const getPostW = asyncErrorWrapper(async (req, res) => {
  const { postid } = req.params;
  const { id } = res.locals;
  const post = await getPostWQ(id, postid);
  res.json(post);
});

const deleteRoom = asyncErrorWrapper(async (req, res) => {
  const { id } = res.locals;
  const { roomid } = req.params;
  await deleteRoomQ(id, roomid);
  res.json({ status: "ok" });
});

export {
  getRooms,
  getRoom,
  startRoom,
  sendMessage,
  getMessages,
  deleteMessage,
  getPostW,
  deleteRoom,
};
