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
    (ispublic or (is not null r.type and r.type = 0) or u.id = $1) and b is not null and (r.type is null or r.type != 2)
    `;
  db.query(query, values).then((r) => r.rows[0] || null);
};

export { createPostQ, getPostQ };
