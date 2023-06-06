import db from "../db/db";
import blocked from "../functions/blocked";
import ILast from "../functions/last";
import then from "../functions/then";

const searchProfileQ = (id: string, u: string) =>
  db
    .query(
      `
      select username, pp, fullname from users u
      left join relationships b on b.owner = u.id and b.target = $1 and b.type = 2
      left join relationships f on f.owner = $1 and f.target = u.id and f.type = 0
      where b is null and username like $2 || '%'
      order by f.created desc nulls last, u.followercount DESC, u.username ASC
      limit 24;
  `,
      [id, u]
    )
    .then((r) => r.rows);

const getMyProfileQ = (id: string) =>
  db
    .query(
      `select id, pp, username, reqcount::int, unreadmessagescount::int, nreqcount::int, npostlikescount::int, ncreatedcommentcount::int from users where id = $1`,
      [id]
    )
    .then((r) => r.rows[0]);

const getProfileQ = (id: string, username: string, guest: boolean) => {
  const values = [id, username];
  if (guest) values.shift();
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

  return db.query(query, values).then((r) => r.rows[0] || null);
};

const getProfilePostsQ = (
  id: string,
  username: string,
  guest: boolean,
  last?: ILast
) => {
  const values: (string | Date | number)[] = [id, username];
  if (last) values.push(last.date, last.id);
  const str = last
    ? `and (p.created, p.id) < ($${guest ? 2 : 3}, $${guest ? 3 : 4})`
    : ``;
  if (guest) values.shift();
  const b = blocked(`p.owner`);

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

  return db.query(query, values).then(then);
};

const getMySavedQ = (id: string, last?: ILast) => {
  const values: (string | number | Date)[] = [id];
  if (last) values.push(last.date, last.id);
  const str = last ? `and (p.created, p.id) < ($2, $3)` : ``;
  const b = blocked("p.owner");
  return db
    .query(
      `
      select s.*, p.id, cardinality(images)>1 more, images[1] cover, likecount::int,username, pp, content, p.created, u.id owner, commentcount::int, s is not null issaved, pl is not null isliked from saved s
      left join posts p on p.id = s.post
      left join postlikes pl on pl.owner = $1 and pl.post = p.id
      left join users u on u.id = p.owner ${b}
      left join relationships f on f.owner = $1 and f.target = p.owner and f.type = 0
      where s.owner = $1 and (u.ispublic or f is not null or u.id = $1) and b is null ${str}
      limit 12
  `,
      values
    )
    .then(then);
};

const followUserQ = (id: string, userid: string) =>
  db
    .query(
      `
      INSERT INTO relationships (owner, target, type)
      SELECT $1, $2,
            CASE WHEN u.ispublic = true THEN 0 ELSE 1 END
      FROM users u
      ${blocked("u.id")}
      where u.id = $2 and b is null and not exists (select 1 from relationships r where r.owner = $1 and r.target = $2)
      returning type
    `,
      [id, userid]
    )
    .then((r) => r.rows[0]?.type);

const unFollowUserQ = (id: string, userid: string) =>
  db.query(`delete from relationships where owner = $1 and target = $2`, [
    id,
    userid,
  ]);

const blockUserQ = (id: string, userid: string) =>
  db.query(
    `
      WITH updated_rows AS (
        UPDATE relationships
        SET type = 2
        WHERE owner = $1 AND target = $2
        RETURNING *
      )
      INSERT INTO relationships (owner, target, type)
      SELECT $1, $2, 2
      WHERE NOT EXISTS (SELECT * FROM updated_rows);
    `,
    [id, userid]
  );

const unBlockUserQ = (id: string, userid: string) =>
  db.query(`delete from relationships where owner = $1 and target = $2`, [
    id,
    userid,
  ]);

const getMyProfileDetailQ = (id: string) =>
  db
    .query(
      `select id, username,ispublic, email, pp, bio, unreadmessagescount::int, nreqcount::int, nreqcount::int,npostlikescount::int , fullname from users
       where id = $1
  `,
      [id]
    )
    .then((r) => r.rows[0]);

const updateProfileQ = (id: string, values: {}) =>
  db.query(
    `update users set ${Object.entries(values)
      .map(([key], index) => `${key} = $${index + 2}`)
      .join(", ")} where id = $1`,
    [id, ...Object.values(values)]
  );

const getMyNotificationsQ = (id: string, conv?: ILast) => {
  const values: any[] = [id];
  if (conv) values.push(conv.date, conv.id);
  const str = conv ? ` and (n.created, n.id) < ($2, $3) ` : ``;
  const b = blocked("u.id");
  // 2 query !!
  return db
    .query(
      `    
    select n.*, u.pp, u.username, p.images[1] from notifications n
    left join users u on u.id = n.owner
    left join posts p on p.id = n.pi ${b}
    where n.target = $1 and b is null and n.owner != $1 ${str}
    order by n.created DESC, n.id DESC
    limit 12;
  `,
      values
    )
    .then((r) =>
      db
        .query(
          `update users set
           nreqcount = 0,
           npostlikescount = 0,
           ncreatedcommentcount= 0
           where id = $1;`,
          [id]
        )
        .then((_) => r.rows)
    );
};

export {
  searchProfileQ,
  getMyProfileQ,
  getProfileQ,
  getProfilePostsQ,
  getMySavedQ,
  followUserQ,
  unFollowUserQ,
  getMyNotificationsQ,
  blockUserQ,
  unBlockUserQ,
  getMyProfileDetailQ,
  updateProfileQ,
};
