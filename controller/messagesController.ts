import db from "../db/db";
import conv from "../functions/converter";
import { asyncErrorWrapper } from "../mw/error";
import { getRoomsQ } from "../queries/messagesQ";

const getRooms = asyncErrorWrapper(async (req, res) => {
  const { id } = res.locals;

  const rooms = await getRoomsQ(id, conv(req.query));
  res.json(rooms);
});

export { getRooms };
