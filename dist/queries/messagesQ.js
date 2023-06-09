"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomsQ = void 0;
const db_1 = __importDefault(require("../db/db"));
const then_1 = __importDefault(require("../functions/then"));
const getRoomsQ = (id, last) => {
    const values = [id];
    if (last)
        values.push(last.date, last.id);
    const str = last ? `and r(m.created, m.id) < ($2, $3)` : ``;
    return db_1.default
        .query(`
    select r.*, m.*, u.id, u.username, u.pp, u.fullname, u.is_online, u.lastonline from rooms r
    left join users u on u.id = case WHEN r.members[1] <> $1 then r.members[1] else r.members[2] END
    left join messages m on m.id = r.last_msg
    left join relationships b on (b.owner = $1 and b.target = any(r.members) and b.type = 2) or (b.target = $1 and b.owner = any(r.members) and b.type = 2) 
    WHERE $1 = any(r.members) ${str} and b is null
    order by m.created desc,m.id desc
    limit 12
  `, values)
        .then(then_1.default);
};
exports.getRoomsQ = getRoomsQ;
