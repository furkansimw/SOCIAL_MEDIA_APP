import db from "../db/db";

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

const getProfileQ = (id: string, username: string) =>
  db
    .query(
      `
      select u.id, username, ispublic, pp, fullname, bio, postcount::int, followercount::int, followingcount::int, f.type status, b.type = 0 isfollowingme from users u
      left join relationships b on b.owner = u.id and b.target = $1
      left join relationships f on f.owner = $1 and f.target = u.id
      where u.username = $2 and (b is null or b.type != 2)
`,
      [id, username]
    )
    .then((r) => r.rows[0] || null);

export { searchProfileQ, getProfileQ };
