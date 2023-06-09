import db from "../db/db";
import conv from "../functions/converter";
import { asyncErrorWrapper, badRequest } from "../mw/error";
import {
  getRoomsQ,
  startRoomQ,
  getRoomQ,
  sendMessageQ,
  selectReplyForMessage,
  getMessagesQ,
  deleteMessageQ,
} from "../queries/messagesQ";

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
  let { content, type, reply } = req.body;
  type = parseInt(type);
  if (!(type > 0 && type <= 3)) return badRequest();
  if (type == 3) {
    const a = await selectReplyForMessage(reply);
    if (a == null) badRequest();
    reply = `${a.id}-${a.content}`;
  }
  const result = await sendMessageQ(id, roomid, content, type, reply);
  res.json(result);
});

const getMessages = asyncErrorWrapper(async (req, res) => {
  const { id } = res.locals;
  const { roomid } = req.params;

  const result = await getMessagesQ(id, roomid);
  res.json(result);
});

const deleteMessage = asyncErrorWrapper(async (req, res) => {
  const { id } = res.locals;
  const { roomid, messageid } = req.params;

  const result = await deleteMessageQ(id, roomid, messageid);
  res.json(result);
});

export {
  getRooms,
  getRoom,
  startRoom,
  sendMessage,
  getMessages,
  deleteMessage,
};
