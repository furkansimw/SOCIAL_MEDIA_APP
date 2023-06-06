"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileQ = exports.getMyProfileDetailQ = exports.unBlockUserQ = exports.blockUserQ = exports.getMyNotificationsQ = exports.unFollowUserQ = exports.followUserQ = exports.getMySavedQ = exports.getProfilePostsQ = exports.getProfileQ = exports.getMyProfileQ = exports.searchProfileQ = void 0;
const db_1 = __importDefault(require("../db/db"));
const blocked_1 = __importDefault(require("../functions/blocked"));
const then_1 = __importDefault(require("../functions/then"));
const searchProfileQ = (id, u) => db_1.default
    .query(`
      select username, pp, fullname from users u
      left join relationships b on b.owner = u.id and b.target = $1 and b.type = 2
      left join relationships f on f.owner = $1 and f.target = u.id and f.type = 0
      where b is null and username like $2 || '%'
      order by f.created desc nulls last, u.followercount DESC, u.username ASC
      limit 24;
  `, [id, u])
    .then((r) => r.rows);
exports.searchProfileQ = searchProfileQ;
const getMyProfileQ = (id) => db_1.default
    .query(`select id, pp, username, reqcount::int, unreadmessagescount::int, nreqcount::int, npostlikescount::int, ncreatedcommentcount::int from users where id = $1`, [id])
    .then((r) => r.rows[0]);
exports.getMyProfileQ = getMyProfileQ;
const getProfileQ = (id, username, guest) => {
    const values = [id, username];
    if (guest)
        values.shift();
    const query = guest
        ? `
    select id, pp, fullname, username, bio, ispublic, postcount::int, followercount::int, followingcount::int from users u
    where username = $1
  `
        : `
    select id, pp, fullname, username, bio, ispublic, postcount::int, followercount::int, followingcount::int,
    (select type from relationships r where owner = $1 and target = u.id) status,
    (select type from relationships r where owner = u.id and target = $1 and type = 0) is not null isfollowingme from users u
    where username = $2 
    and not exists (select 1 from relationships r where owner = u.id and target = $1 and type = 2)
    `;
    return db_1.default.query(query, values).then((r) => r.rows[0] || null);
};
exports.getProfileQ = getProfileQ;
const getProfilePostsQ = (id, username, guest, last) => {
    const values = [id, username];
    if (last)
        values.push(last.date, last.id);
    const str = last
        ? `and (p.created, p.id) < ($${guest ? 2 : 3}, $${guest ? 3 : 4})`
        : ``;
    if (guest)
        values.shift();
    const b = (0, blocked_1.default)(`p.owner`);
    const query = guest
        ? `
    select p.id, cardinality(images)>1 more, images[1] cover, likecount::int,username, pp, content, p.created, u.id owner, commentcount::int from posts p
    left join users u on u.id = p.owner
    where username = $1 and u.ispublic ${str}
    order by p.created desc
    limit 12
  `
        : `
    select p.id, cardinality(images)>1 more, images[1] cover, likecount::int,username, pp, content, p.created, u.id owner, commentcount::int, s is not null issaved, pl is not null isliked, f is not null isfollowing from posts p    
    left join users u on u.id = p.owner
    left join saved s on s.owner = $1 and s.post = p.id
    left join postlikes pl on pl.owner = $1 and pl.post = p.id
    left join relationships f on f.owner = $1 and f.target = u.id and f.type = 0
    ${b}
    where username = $2 and (u.ispublic or f is not null or u.id = $1) and b is null ${str}
    limit 12
    `;
    return db_1.default.query(query, values).then(then_1.default);
};
exports.getProfilePostsQ = getProfilePostsQ;
const getMySavedQ = (id, last) => {
    const values = [id];
    if (last)
        values.push(last.date, last.id);
    const str = last ? `and (p.created, p.id) < ($2, $3)` : ``;
    const b = (0, blocked_1.default)("p.owner");
    return db_1.default
        .query(`
      select s.*, p.id, cardinality(images)>1 more, images[1] cover, likecount::int,username, pp, content, p.created, u.id owner, commentcount::int, s is not null issaved, pl is not null isliked from saved s
      left join posts p on p.id = s.post
      left join postlikes pl on pl.owner = $1 and pl.post = p.id
      left join users u on u.id = p.owner ${b}
      left join relationships f on f.owner = $1 and f.target = p.owner and f.type = 0
      where s.owner = $1 and (u.ispublic or f is not null or u.id = $1) and b is null ${str}
      limit 12
  `, values)
        .then(then_1.default);
};
exports.getMySavedQ = getMySavedQ;
const followUserQ = (id, userid) => db_1.default
    .query(`
      INSERT INTO relationships (owner, target, type)
      SELECT $1, $2,
            CASE WHEN u.ispublic = true THEN 0 ELSE 1 END
      FROM users u
      ${(0, blocked_1.default)("u.id")}
      where u.id = $2 and b is null and not exists (select 1 from relationships r where r.owner = $1 and r.target = $2)
      returning type
    `, [id, userid])
    .then((r) => { var _a; return (_a = r.rows[0]) === null || _a === void 0 ? void 0 : _a.type; });
exports.followUserQ = followUserQ;
const unFollowUserQ = (id, userid) => db_1.default.query(`delete from relationships where owner = $1 and target = $2`, [
    id,
    userid,
]);
exports.unFollowUserQ = unFollowUserQ;
const blockUserQ = (id, userid) => db_1.default
    .query(`
     INSERT INTO relationships (owner, target ,type) select $1, $2, 2 from relationships r where
     not exists (select 1 from relationships where owner = $2 and target = $1 and type = 2) and 
     not exists (select 1 from relationships where owner = $1 and target = $2 and type = 2)
    `, [id, userid])
    .then((r) => {
    console.log(r.rows[0]);
});
exports.blockUserQ = blockUserQ;
const unBlockUserQ = (id, userid) => db_1.default.query(`delete from relationships where owner = $1 and target = $2`, [
    id,
    userid,
]);
exports.unBlockUserQ = unBlockUserQ;
const getMyProfileDetailQ = (id) => db_1.default
    .query(`select id, username,ispublic, email, pp, bio, unreadmessagescount::int, nreqcount::int, nreqcount::int,npostlikescount::int , fullname from users
       where id = $1
  `, [id])
    .then((r) => r.rows[0]);
exports.getMyProfileDetailQ = getMyProfileDetailQ;
const updateProfileQ = (id, values) => db_1.default.query(`update users set ${Object.entries(values)
    .map(([key], index) => `${key} = $${index + 2}`)
    .join(", ")} where id = $1`, [id, ...Object.values(values)]);
exports.updateProfileQ = updateProfileQ;
const getMyNotificationsQ = (id, conv) => {
    const values = [id];
    if (conv)
        values.push(conv.date, conv.id);
    const str = conv ? ` and (n.created, n.id) < ($2, $3) ` : ``;
    const b = (0, blocked_1.default)("u.id");
    // 2 query !!
    return db_1.default
        .query(`    
    select n.*, u.pp, u.username, p.images[1] from notifications n
    left join users u on u.id = n.owner
    left join posts p on p.id = n.pi ${b}
    where n.target = $1 and b is null and n.owner != $1 ${str}
    order by n.created DESC, n.id DESC
    limit 12;
  `, values)
        .then((r) => db_1.default
        .query(`update users set
           nreqcount = 0,
           npostlikescount = 0,
           ncreatedcommentcount= 0
           where id = $1;`, [id])
        .then((_) => r.rows));
};
exports.getMyNotificationsQ = getMyNotificationsQ;
