"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostQ = exports.getExplorePostsQ = exports.getPostsQ = void 0;
const db_1 = __importDefault(require("../db/db"));
const getPostsQ = (id, offset, sd) => {
    const str = sd ? `and p.created < $3` : ``;
    const values = [id, offset];
    if (sd)
        values.push(sd);
    return db_1.default
        .query(`
      select p.*, likecount::int, commentcount::int, pl is not null isliked, s is not null issaved from posts p
      left join users u on u.id = p.owner
      left relationships f on f.owner = $1 and f.target = u.id and f.type = 0
      left join postlikes pl on pl.owner = $1 and pl.post = p.id
      left join saved s on s.owner = $1 and s.post = p.id
      where f is not null ${str}
      order by p.created desc
      limit 12 offset $2
  `)
        .then((r) => r.rows);
};
exports.getPostsQ = getPostsQ;
const getExplorePostsQ = (id, offset, sd) => {
    const str = sd ? `and p.created < $3` : ``;
    const values = [id, offset];
    if (sd)
        values.push(sd);
    return db_1.default
        .query(`
      select p.id, cardinality(images)>1 more, images[1], likecount::int, commentcount::int cover from posts p
      left join users u on u.id = p.owner
      left join relationships r on (r.owner = $1 and r.target = u.id) or (r.owner = u.id and r.target = $1 and r.type = 2) 
      where ispublic and r is null and p.owner != $1 ${str} 
      order by p.created desc 
      limit 12 offset $2
  `)
        .then((r) => r.rows);
};
exports.getExplorePostsQ = getExplorePostsQ;
const createPostQ = (id, urls, content) => db_1.default
    .query("insert into posts (owner,images,content) values ($1,$2,$3) returning id", [id, urls, content])
    .then((r) => r.rows[0].id);
exports.createPostQ = createPostQ;
