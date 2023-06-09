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
exports.getRoomQ = exports.startRoomQ = exports.getRoomsQ = void 0;
const db_1 = __importDefault(require("../db/db"));
const then_1 = __importDefault(require("../functions/then"));
const getRoomsQ = (id, requests, last) => {
    const values = [id];
    if (last)
        values.push(last.date, last.id);
    const str = last ? `and r(m.created, m.id) < ($2, $3)` : ``;
    return db_1.default
        .query(`
    select r.id rid, m.*,c.inbox inbox, u.id, u.username, u.pp, u.fullname, u.is_online, u.lastonline from rooms r
    left join users u on u.id = case WHEN r.members[1] <> $1 then r.members[1] else r.members[2] END
    left join messages m on m.id = r.last_msg
    left join cursor c on c.room = r.id and c.owner = $1
    left join relationships b on (b.owner = $1 and b.target = any(r.members) and b.type = 2) or (b.target = $1 and b.owner = any(r.members) and b.type = 2) 
    left join relationships f on f.owner = $1 and f.target = u.id and f.type = 0
    WHERE $1 = any(r.members) ${str} and b is null and (c is not null and c.inbox = ${!requests}) 
    order by m.created desc, m.id desc
    limit 12
  `, values)
        .then(then_1.default);
};
exports.getRoomsQ = getRoomsQ;
const startRoomQ = (id, userid) => __awaiter(void 0, void 0, void 0, function* () {
    const roomsIsExists = yield db_1.default.query(`
    select r.id rid, m.*, u.id, u.username, u.pp, u.fullname, u.is_online, u.lastonline from rooms r
    left join users u on u.id = case WHEN r.members[1] <> $1 then r.members[1] else r.members[2] END
    left join messages m on m.id = r.last_msg
    left join relationships b on (b.owner = $1 and b.target = any(r.members) and b.type = 2) or (b.target = $1 and b.owner = any(r.members) and b.type = 2) 
    WHERE $1 = any(r.members) and b is null
    order by m.created desc,m.id desc
    limit 1
    `);
    // await db.query(`insert into rooms (members) values ($1)`, [id, userid]);
});
exports.startRoomQ = startRoomQ;
const getRoomQ = (id, roomid) => db_1.default
    .query(`
    select r.id rid,c.inbox inbox, m.id mid, m.owner mowner,m.type mtype,m.content mcontent,m.reply mreply,m.created mcreated, u.id uid, u.username, u.pp, u.fullname, u.is_online, u.lastonline from rooms r
    left join users u on u.id = case WHEN r.members[1] <> $1 then r.members[1] else r.members[2] END
    left join messages m on m.id = r.last_msg
    left join cursor c on c.room = r.id
    left join relationships b on (b.owner = $1 and b.target = any(r.members) and b.type = 2) or (b.target = $1 and b.owner = any(r.members) and b.type = 2) 
    WHERE r.id = $2 and $1 = any(r.members) and b is null
    order by m.created desc,m.id desc
    limit 1
`, [id, roomid])
    .then((r) => r.rows[0] || null);
exports.getRoomQ = getRoomQ;
