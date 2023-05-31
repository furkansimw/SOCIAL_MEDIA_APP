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
  const str = sd ? `` : ``;
  const b = blocked("");
  const query = guest ? `` : ``;

  return db.query(query, values).then(then);
};

export { searchProfileQ, getMyProfileQ, getProfileQ, getProfilePostsQ };
