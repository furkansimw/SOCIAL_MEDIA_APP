import db from "../db/db";
import blocked from "../functions/blocked";
import ILast from "../functions/last";
import then from "../functions/then";

/*

  room_id
  last_message_id
  last_message_owner
  last_message_type
  last_message_content
  last_message_reply
  last_message_created
  user_seen
  my_seen
  inbox

*/

const getRoomsQ = (id: string, requests: boolean, last?: ILast) => {
  const values: any[] = [id];
  if (last) values.push(last.date, last.id);

  const str = last ? `and r(m.created, m.id) < ($2, $3)` : ``;
  return db
    .query(
      `
    select r.id room_id,m.id last_message_id, m.owner last_message_owner, COALESCE(m.type::int, null) last_message_type, m.content last_message_content, m.created last_message_created, uc.seen user_seen, mc.seen my_seen, mc.inbox inbox, u.username, u.pp, u.fullname, u.is_online, u.id uid, u.lastonline from rooms r
    left join users u on u.id = case WHEN r.members[1] != $1 then r.members[1] else r.members[2] END
    left join messages m on m.id = r.last_msg
    left join cursor mc on mc.room = r.id and mc.owner = $1
    left join cursor uc on uc.room = r.id and uc.owner = u.id
    left join relationships b on (b.owner = $1 and b.target = any(r.members) and b.type = 2) or (b.target = $1 and b.owner = any(r.members) and b.type = 2) 
    left join relationships f on f.owner = $1 and f.target = u.id and f.type = 0
    WHERE $1 = any(r.members) ${str} and b is null and (mc is not null and mc.is_active and mc.inbox = ${!requests}) 
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
    left join users u on u.id = case WHEN r.members[1] != $1 then r.members[1] else r.members[2] END
    left join messages m on m.id = r.last_msg
    ${blocked("u.id")}
    WHERE $1 = any(r.members) and $2 = any(r.members) and b is null
    order by m.created desc,m.id desc
    limit 1
    `,
    [id, userid]
  );
  if (roomsIsExists.rows.length > 0) return roomsIsExists.rows[0]?.id;
  return db
    .query(`insert into rooms (members) values ($1) returning id `, [
      [id, userid],
    ])
    .then((r) => r.rows[0]?.id);
};

//todo room interface fixede
const getRoomQ = (id: string, roomid: string) =>
  db
    .query(
      `
    select r.id room_id,m.id last_message_id, m.owner last_message_owner,COALESCE(m.type::int, null) last_message_type , m.content last_message_content, m.created last_message_created, uc.seen user_seen, mc.seen my_seen, mc.inbox inbox, u.username, u.pp, u.fullname, u.is_online, u.id uid, u.lastonline from rooms r
    left join users u on u.id = case WHEN r.members[1] != $1 then r.members[1] else r.members[2] END
    left join messages m on m.id = r.last_msg
    left join cursor mc on mc.room = r.id and mc.owner = $1
    left join cursor uc on uc.room = r.id and uc.owner = u.id
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
    .query(`select id,content from messages where id = $1`, [id])
    .then((r) => r.rows[0] || null);

const sendMessageQ = (
  id: string,
  roomid: string,
  content: string,
  type: 0 | 1 | 2 | 3,
  messageid: string,
  reply: string | null
) =>
  db
    .query(
      `insert into messages (owner, room, content, type, reply, id) select $1, $2, $3, $4, $5, $6 from rooms r where id = $2 and $1 = any(members) and not exists (
          select 1 from relationships b where b.type = 2 and (b.owner = $1 and b.target = any(r.members)) or (b.target = $1 and b.owner = any(r.members)) 
      ) returning *,type::int`,
      [id, roomid, content, type, reply, messageid]
    )
    .then((r) => r.rows[0]);

const getMessagesQ = (id: string, roomid: string, last?: ILast) => {
  const values: any[] = [id, roomid];
  const str = last ? `and (m.created, m.id) < ($3, $4)` : ``;
  if (last) values.push(last.date, last.id);
  return db
    .query(
      `
          select m.*, m.type::int, u.username, u.pp from messages m 
          left join users u on m.owner = u.id
          left join rooms r on r.id = m.room
          where m.room = $2 and $1 = ANY(r.members) ${str}
          order by m.created desc, m.id desc
          limit 24
    `,
      values
    )
    .then(then);
};

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
