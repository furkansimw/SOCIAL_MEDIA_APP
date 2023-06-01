import db from "../db/db";
import blocked from "../functions/blocked";
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
    .query(`select id, pp, username from users where id = $1`, [id])
    .then((r) => r.rows[0]);

const getProfileQ = (id: string, username: string, guest: boolean) => {
  const values = [id, username];
  if (guest) values.shift();
  const query = guest
    ? `
    select pp, fullname, username, bio, ispublic, postcount::int, followercount::int, followingcount::int from users u
    where username = $1 and ispublic 
  `
    : `
    select pp, fullname, username, bio, ispublic, postcount::int, followercount::int, followingcount::int,
    (select type from relationships r where owner = $1 and target = u.id) status,
    (select type from relationships r where owner = u.id and target = $1 and type = 0) is not null isfollowingme from users u
    where username = $2 and (ispublic or exists (select 1 from relationships r where owner = $1 and target = u.id) or u.id = $1)
    and not exists (select 1 from relationships r where owner = u.id and target = $1 and type = 2)
    `;

  return db.query(query, values).then((r) => r.rows[0] || null);
};

const getProfilePostsQ = (
  id: string,
  username: string,
  guest: boolean,
  offset: number,
  sd?: Date
) => {
  const values: (string | Date | number)[] = [id, username, offset];
  if (sd) values.push(sd);
  const str = sd ? `and p.created < $${guest ? 3 : 4}` : ``;
  const b = blocked(`p.owner`);
  const query = guest
    ? `
    select p.id, cardinality(images)>1 more, images[1] cover, likecount::int,username, pp, content, p.created, u.id owner, commentcount::int from posts p
    left join users u on u.id = p.owner
    where username = $1 and u.ispublic ${str}
    order by p.created desc
    limit 12 offset $2
  `
    : `
    select p.id, cardinality(images)>1 more, images[1] cover, likecount::int,username, pp, content, p.created, u.id owner, commentcount::int, s is not null issaved, pl is not null isliked from posts p    
    left join users u on u.id = p.owner
    left join saved s on s.owner = $1 and s.post = p.id
    left join postlikes pl on pl.owner = $1 and pl.post = p.id
    left join relationships f on f.owner = $1 and f.target = u.id and f.type = 0
    ${b}
    where username = $2 and (u.ispublic or f is not null or u.id = $1) and b is null ${str}
    limit 12 offset $3
    `;

  return db.query(query, values).then(then);
};

const getMySavedQ = (id: string, offset: number, sd?: Date) => db.query(``);

const followUserQ = (id: string, username: string) => db.query(``);

const unFollowUserQ = (id: string, username: string) => db.query(``);

const blockUserQ = (id: string, username: string) => db.query(``);

const unBlockUserQ = (id: string, username: string) => db.query(``);

export {
  searchProfileQ,
  getMyProfileQ,
  getProfileQ,
  getProfilePostsQ,
  getMySavedQ,
  followUserQ,
  unFollowUserQ,
  blockUserQ,
  unBlockUserQ,
};
