import db from "../db/db";

const getPostsQ = (id: string, offset: number, sd?: Date) => {
  const str = sd ? `and p.created < $3` : ``;
  const values: any[] = [id, offset];
  if (sd) values.push(sd);

  return db
    .query(
      `
      select p.*, likecount::int, commentcount::int, pl is not null isliked, s is not null issaved from posts p
      left join users u on u.id = p.owner
      left join relationships f on f.owner = $1 and f.target = u.id and f.type = 0
      left join postlikes pl on pl.owner = $1 and pl.post = p.id
      left join saved s on s.owner = $1 and s.post = p.id
      where f is not null ${str}
      order by p.created desc
      limit 12 offset $2
  `,
      values
    )
    .then((r) => r.rows);
};
const getExplorePostsQ = (id: string, offset: number, sd?: Date) => {
  const str = sd ? `and p.created < $3` : ``;
  const values: any[] = [id, offset];
  if (sd) values.push(sd);

  return db
    .query(
      `
      select p.id, cardinality(images)>1 more, images[1] cover, likecount::int,username, pp, content, p.created, u.id owner, commentcount::int from posts p
      left join users u on u.id = p.owner
      left join relationships r on (r.owner = $1 and r.target = u.id) or (r.owner = u.id and r.target = $1 and r.type = 2) 
      where ispublic and r is null and p.owner != $1 ${str} 
      order by p.created desc 
      limit 12 offset $2
  `,
      values
    )
    .then((r) => r.rows);
};
const createPostQ = (id: string, urls: string[], content?: string) =>
  db
    .query(
      "insert into posts (owner,images,content) values ($1,$2,$3) returning id",
      [id, urls, content]
    )
    .then((r) => r.rows[0].id);

export { getPostsQ, getExplorePostsQ, createPostQ };
