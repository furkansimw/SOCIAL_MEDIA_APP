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

export { searchProfileQ };
