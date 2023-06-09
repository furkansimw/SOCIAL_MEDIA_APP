import db from "../db/db";
import conv from "../functions/converter";
import { asyncErrorWrapper } from "../mw/error";
import { getRoomsQ, startRoomQ, getRoomQ } from "../queries/messagesQ";

const getRooms = asyncErrorWrapper(async (req, res) => {
  const { id } = res.locals;
  const { requests } = req.query;
  const rooms = await getRoomsQ(
    id,
    ["undefined", "false", false, undefined].includes((requests as any) ?? ""),
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

export { getRooms, getRoom, startRoom };
