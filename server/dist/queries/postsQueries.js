"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostQ = exports.createPostQ = void 0;
const db_1 = __importDefault(require("../db/db"));
const createPostQ = (id, urls, content) => db_1.default
    .query("insert into posts (owner,images,content) values ($1,$2,$3) returning id", [id, urls, content])
    .then((r) => r.rows[0].id);
exports.createPostQ = createPostQ;
const getPostQ = (id, postid, guest) => {
    const values = [id, postid];
    if (guest)
        values.shift();
    const query = guest
        ? `
    select p.*, likecount::int, commentcount::int from posts p
    left join users u on u.id = p.owner
    where p.id = $1 and ispublic
  `
        : `
    select p.*, likecount::int, commentcount::int, (select ) is not null isliked, (select ) is not null issaved from posts p
    left join users u on u.id = p.owner
    left join relationships r on r.owner = $1 and r.target = u.id
    left join relationships b on b.owner = u.id and b.target = $1 and b.type = 2
    left join p.id = $1 and
    (ispublic or (is not null r.type and r.type = 0) or u.id = $1) and b is not null and (r.type is null or r.type != 2)
    `;
    db_1.default.query(query, values).then((r) => r.rows[0] || null);
};
exports.getPostQ = getPostQ;
