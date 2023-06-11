"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessageQ = exports.getMessagesQ = exports.selectReplyForMessage = exports.sendMessageQ = exports.getRoomQ = exports.startRoomQ = exports.getRoomsQ = void 0;
const db_1 = __importDefault(require("../db/db"));
const blocked_1 = __importDefault(require("../functions/blocked"));
const then_1 = __importDefault(require("../functions/then"));
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
const getRoomsQ = (id, requests, last) => {
    const values = [id];
    if (last)
        values.push(last.date, last.id);
    const str = last ? `and r(m.created, m.id) < ($2, $3)` : ``;
    return db_1.default
        .query(`
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
  `, values)
        .then(then_1.default);
};
exports.getRoomsQ = getRoomsQ;
const startRoomQ = (id, userid) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const roomsIsExists = yield db_1.default.query(`
    select r.id from rooms r
    left join users u on u.id = case WHEN r.members[1] != $1 then r.members[1] else r.members[2] END
    left join messages m on m.id = r.last_msg
    ${(0, blocked_1.default)("u.id")}
    WHERE $1 = any(r.members) and $2 = any(r.members) and b is null
    order by m.created desc,m.id desc
    limit 1
    `, [id, userid]);
    if ((_a = roomsIsExists.rows[0]) === null || _a === void 0 ? void 0 : _a.id)
        return (_b = roomsIsExists.rows[0]) === null || _b === void 0 ? void 0 : _b.id;
    db_1.default.query(`insert into rooms (members) values ($1) returning id`, [
        [id, userid],
    ]).then((r) => { var _a; return (_a = r.rows[0]) === null || _a === void 0 ? void 0 : _a.id; });
});
exports.startRoomQ = startRoomQ;
//todo room interface fixede
const getRoomQ = (id, roomid) => db_1.default
    .query(`
    select r.id room_id,m.id last_message_id, m.owner last_message_owner,COALESCE(m.type::int, null) last_message_type , m.content last_message_content, m.created last_message_created, uc.seen user_seen, mc.seen my_seen, mc.inbox inbox, u.username, u.pp, u.fullname, u.is_online, u.id uid, u.lastonline from rooms r
    left join users u on u.id = case WHEN r.members[1] != $1 then r.members[1] else r.members[2] END
    left join messages m on m.id = r.last_msg
    left join cursor mc on mc.room = r.id and mc.owner = $1
    left join cursor uc on uc.room = r.id and uc.owner = u.id
    left join relationships b on (b.owner = $1 and b.target = any(r.members) and b.type = 2) or (b.target = $1 and b.owner = any(r.members) and b.type = 2) 
    WHERE r.id = $2 and $1 = any(r.members) and b is null
    order by m.created desc,m.id desc
    limit 1
`, [id, roomid])
    .then((r) => r.rows[0] || null);
exports.getRoomQ = getRoomQ;
const selectReplyForMessage = (id) => db_1.default
    .query(`select id,content from messages where id = $1`, [id])
    .then((r) => r.rows[0] || null);
exports.selectReplyForMessage = selectReplyForMessage;
const sendMessageQ = (id, roomid, content, type, messageid, reply) => db_1.default
    .query(`insert into messages (owner, room, content, type, reply, id) select $1, $2, $3, $4, $5, $6 from rooms r where id = $2 and $1 = any(members) and not exists (
          select 1 from relationships b where b.type = 2 and (b.owner = $1 and b.target = any(r.members)) or (b.target = $1 and b.owner = any(r.members)) 
      ) returning *,type::int`, [id, roomid, content, type, reply, messageid])
    .then((r) => r.rows[0]);
exports.sendMessageQ = sendMessageQ;
const getMessagesQ = (id, roomid, last) => {
    const values = [id, roomid];
    const str = last ? `(m.created, m.id) < ($3, $4)` : ``;
    if (last)
        values.push(last.date, last.id);
    return db_1.default
        .query(`
          select m.*, m.type::int, u.username, u.pp from messages m 
          left join users u on m.owner = u.id
          left join rooms r on r.id = m.room
          where m.room = $2 and $1 = ANY(r.members) ${str}
    `, values)
        .then((r) => r.rows);
};
exports.getMessagesQ = getMessagesQ;
const deleteMessageQ = (id, roomid, messageid) => db_1.default.query(``, [id, roomid, messageid]);
exports.deleteMessageQ = deleteMessageQ;
