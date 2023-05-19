import db from "../db/db";

const createPostQ = (id: string, urls: string[], content: string) =>
  db
    .query(
      "insert into posts (owner,images,content) values ($1,$2,$3) returning id",
      [id, urls, content]
    )
    .then((r) => r.rows[0].id);

const getPostQ = (id: string, postid: string, guest: boolean) => {
  const values = [id, postid];
  if (guest) values.shift();
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
    (ispublic or coalesce(f.type, -1) = 0 or u.id = $1) and b is not null and coalesce(r.type, -1) != 2)
    `;
  return db.query(query, values).then((r) => r.rows[0] || null);
};

const getPostLikesQ = (
  id: string,
  postid: string,
  offset: number,
  sd?: Date
) => {
  const values: any[] = [id, postid, offset];
  if (sd) values.push(sd);

  const str = sd ? `and pl.created < $4` : ``;

  return db.query(
    `select u.username, u.pp, u.fullname, r.type from postlikes pl
     left join users u on u.id = pl.owner
     left join relationships r on r.owner = $1 and r.target = u.id
     left join relationships b on b.owner = u.id and b.target = u.id and b.type = 2
     where pl.post = $2 ${str} and b is null and
     LIMIT 12 offset $3
  `,
    values
  );
};

export { createPostQ, getPostQ, getPostLikesQ };
