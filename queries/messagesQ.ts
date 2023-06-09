import db from "../db/db";
import blocked from "../functions/blocked";
import ILast from "../functions/last";
import then from "../functions/then";

const getRoomsQ = (id: string, requests: boolean, last?: ILast) => {
  const values: any[] = [id];
  if (last) values.push(last.date, last.id);

  const str = last ? `and r(m.created, m.id) < ($2, $3)` : ``;
  return db
    .query(
      `
    select r.id rid,r.last_msg, mc.seen mseen, uc.seen useen, m.*, mc.inbox inbox, u.id uid, u.username, u.pp, u.fullname, u.is_online, u.lastonline from rooms r
    left join users u on u.id = case WHEN r.members[1] <> $1 then r.members[1] else r.members[2] END
    left join messages m on m.id = r.last_msg
    left join cursor mc on mc.room = r.id and mc.owner = $1
    left join cursor uc on uc.room = r.id and uc.owner = u.id
    left join relationships b on (b.owner = $1 and b.target = any(r.members) and b.type = 2) or (b.target = $1 and b.owner = any(r.members) and b.type = 2) 
    left join relationships f on f.owner = $1 and f.target = u.id and f.type = 0
    WHERE $1 = any(r.members) ${str} and b is null and (mc is not null and mc.inbox = ${!requests}) 
    order by m.created desc, m.id desc
    limit 12
  `,
      values
    )
    .then(then);
};

const startRoomQ = async (id: string, userid: string) => {
  const roomsIsExists = await db.query(
    `
    select r.id from rooms r
    left join users u on u.id = case WHEN r.members[1] <> $1 then r.members[1] else r.members[2] END
    left join messages m on m.id = r.last_msg
    ${blocked("u.id")}
    WHERE $1 = any(r.members) and $2 = any(r.members) and b is null
    order by m.created desc,m.id desc
    limit 1
    `,
    [id, userid]
  );
  if (roomsIsExists.rows[0]?.id) return roomsIsExists.rows[0]?.id;
};

const getRoomQ = (id: string, roomid: string) =>
  db
    .query(
      `
    select r.id rid,c.inbox inbox, m.id mid, m.owner mowner,m.type::int mtype,m.content mcontent,m.reply mreply,m.created mcreated, u.id uid, u.username, u.pp, u.fullname, u.is_online, u.lastonline from rooms r
    left join users u on u.id = case WHEN r.members[1] <> $1 then r.members[1] else r.members[2] END
    left join messages m on m.id = r.last_msg
    left join cursor c on c.room = r.id
    left join relationships b on (b.owner = $1 and b.target = any(r.members) and b.type = 2) or (b.target = $1 and b.owner = any(r.members) and b.type = 2) 
    WHERE r.id = $2 and $1 = any(r.members) and b is null
    order by m.created desc,m.id desc
    limit 1
`,
      [id, roomid]
    )
    .then((r) => r.rows[0] || null);

const selectReplyForMessage = (id: string) =>
  db
    .query(`select id,content from messages where id = $1`)
    .then((r) => r.rows[0] || null);

const sendMessageQ = (
  id: string,
  roomid: string,
  content: string,
  type: 0 | 1 | 2 | 3,
  reply?: string
) =>
  db
    .query(
      `insert into messages (owner, room, content, type, reply) values ($1, $2, $3, $4, $5) returning *,type::int`,
      [id, roomid, content, type, reply]
    )
    .then((r) => r.rows[0]);

const getMessagesQ = (id: string, roomid: string) => db.query(``, [id, roomid]);

const deleteMessageQ = (id: string, roomid: string, messageid: string) =>
  db.query(``, [id, roomid, messageid]);

export {
  getRoomsQ,
  startRoomQ,
  getRoomQ,
  sendMessageQ,
  selectReplyForMessage,
  getMessagesQ,
  deleteMessageQ,
};
