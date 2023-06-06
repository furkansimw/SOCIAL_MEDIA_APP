"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUnSaveQ = exports.postSaveQ = exports.postUnlikeQ = exports.postLikeQ = exports.postCommentQ = exports.getPostQ = exports.getPostLikesQ = exports.getPostImagesQ = exports.getCommentsQ = void 0;
const db_1 = __importDefault(require("../db/db"));
const blocked_1 = __importDefault(require("../functions/blocked"));
const getCommentsQ = (id, postid, guest, last) => {
    const values = [id, postid];
    if (last)
        values.push(last.date, last.id);
    if (guest)
        values.shift();
    const str = last ? `and (c.created, c.id) < ($3, $4)` : ``;
    const query = guest
        ? `
        select c.*, likecount::int, subcommentcount::int, u.username, u.pp from comments c
        left join users u on u.id = c.owner
        where c.post = $1
        order by c.created desc
        limit 12
    `
        : `
        select c.*,likecount::int, subcommentcount::int, u.username,cl is not null isliked, u.pp from comments c
        left join commentlikes cl on cl.comment = c.id
        left join users u on u.id = c.owner
        left join relationships b on (b.owner = $1 and b.target = u.id and b.type = 2) or (b.owner = u.id and b.target = $1 and b.type = 2)
        where c.post = $2 and b is null ${str}
        order by c.owner = $2, created desc
        limit 12
        `;
    return db_1.default.query(query, values).then((r) => r.rows);
};
exports.getCommentsQ = getCommentsQ;
const getPostImagesQ = (id, postid, guest) => {
    const query = guest
        ? `
        select images from posts p
        left join users u on u.id = p.owner
        where p.id = $1 and ispublic
    `
        : `
        select images from posts p
        left join users u on u.id = p.owner
        left join relationships f on f.owner = $1 and f.target = u.id and f.type = 0
        left join relationships b on (b.owner = u.id and f.target = $1 and f.type = 2) or (b.owner = $1 and f.target = u.id and f.type = 2)
        where p.id = $2 and (ispublic or f is not null or u.id = $1) and b is null
      `;
    const values = [id, postid];
    if (guest)
        values.shift();
    return db_1.default.query(query, values).then((r) => { var _a, _b; return (_b = (_a = r.rows[0]) === null || _a === void 0 ? void 0 : _a.images) !== null && _b !== void 0 ? _b : null; });
};
exports.getPostImagesQ = getPostImagesQ;
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
    select p.*, likecount::int, commentcount::int, pl is not null isliked, s is not null issaved, f is not null isfollowing from posts p
    left join users u on u.id = p.owner
    left join postlikes pl on pl.post = p.id and pl.owner = $1
    left join saved s on s.post = p.id and pl.owner = $1
    left join relationships f on f.owner = $1 and f.target = u.id and f.type = 0
    left join relationships b on (b.owner = u.id and b.target = $1 and b.type = 2) or (b.target = u.id and b.owner = $1 and b.type = 2)
    where p.id = $2 and b is null and (ispublic or f is not null or u.id = $1)
    `;
    return db_1.default.query(query, values).then((r) => r.rows[0] || null);
};
exports.getPostQ = getPostQ;
const getPostLikesQ = (id, postid, last) => {
    const values = [id, postid];
    if (last)
        values.push(last.date, last.id);
    const str = last ? `and (pl.created, pl.id) < ($3, $4)` : ``;
    const b = (0, blocked_1.default)("pou.id, plou.id");
    return db_1.default
        .query(`
      select pl.*, plou.username, plou.pp, plou.fullname, f.type status from postlikes pl
      left join users plou on plou.id = pl.owner
      left join posts p on p.id = pl.post
      left join users pou on pou.id = p.owner ${b}
      left join relationships f on (f.owner = $1 and f.target = pl.owner)
      where pl.post = $2 ${str} and b is null
      order by pl.owner = $1 desc, pl.created desc
      limit 12
      `, values)
        .then((r) => r.rows);
};
exports.getPostLikesQ = getPostLikesQ;
const postLikeQ = (id, postid, postowner) => db_1.default
    .query(`
      insert into postlikes (owner, post)
      SELECT $1, $2 FROM posts p
      left join users u on p.owner = u.id
      left join relationships f on f.owner = $1 and f.target = p.owner and f.type = 0
      ${(0, blocked_1.default)("p.owner")}
      where p.id = $2 and (ispublic or f is not null or u.id = $1) and p.owner = $3 and b is null and not exists (select 1 from postlikes pl where pl.owner = $1 and pl.post = $2)
      returning id
      `, [id, postid, postowner])
    .then((r) => {
    var _a;
    if ((_a = r.rows[0]) === null || _a === void 0 ? void 0 : _a.id)
        return postowner;
});
exports.postLikeQ = postLikeQ;
const postUnlikeQ = (id, postid) => db_1.default.query(`
      DELETE FROM postlikes pl
      WHERE pl.owner = $1 and pl.post = $2
      AND exists (
        SELECT 1 FROM posts p
        left join users u on p.owner = u.id
        left join relationships f on f.owner = $1 and f.target = p.owner and f.type = 0
        ${(0, blocked_1.default)("p.owner")}
        where p.id = $2 and (ispublic or f is not null or u.id = $1) and b is null
      );
`, [id, postid]);
exports.postUnlikeQ = postUnlikeQ;
const postCommentQ = (id, postid, content) => db_1.default
    .query(`
      insert into comments (owner, post, content)
      SELECT $1, $2, $3
      FROM posts p
      left join users u on p.owner = u.id
      left join relationships f on f.owner = $1 and f.target = p.owner and f.type = 0
      ${(0, blocked_1.default)("p.owner")}
      where p.id = $2 and (ispublic or f is not null or u.id = $1) and b is null
      returning id
  `, [id, postid, content])
    .then((r) => { var _a; return (_a = r.rows[0]) === null || _a === void 0 ? void 0 : _a.id; });
exports.postCommentQ = postCommentQ;
const postSaveQ = (id, postid) => db_1.default.query(`
    insert into saved (owner, post)
    SELECT $1, $2
    FROM posts p
    left join users u on p.owner = u.id
    left join relationships f on f.owner = $1 and f.target = p.owner and f.type = 0
    ${(0, blocked_1.default)("p.owner")}
    where p.id = $2 and (ispublic or f is not null or u.id = $1) and b is null
    `, [id, postid]);
exports.postSaveQ = postSaveQ;
const postUnSaveQ = (id, postid) => db_1.default.query(`
      DELETE FROM saved s
      WHERE s.owner = $1 and s.post = $2
      AND exists (
        SELECT 1 FROM posts p
        left join users u on p.owner = u.id
        left join relationships f on f.owner = $1 and f.target = p.owner and f.type = 0
        ${(0, blocked_1.default)("p.owner")}
        where p.id = $2 and (ispublic or f is not null or u.id = $1) and b is null
      );
`, [id, postid]);
exports.postUnSaveQ = postUnSaveQ;
