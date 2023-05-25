import db from "../db/db";

const getCommentsQ = (
  id: string,
  postid: string,
  guest: boolean,
  offset: number,
  sd?: Date
) => {
  const values: any[] = [id, postid, offset];
  if (sd) values.push(sd);
  if (guest) values.shift();
  const str = sd ? `and c.created < $4` : ``;
  const query = guest
    ? `
        select c.*, u.username, u.pp from comments c
        left join users u on u.id = c.owner
        where c.post = $1
        order by c.created desc
        limit 12 offset $2
    `
    : `
        select c.*, u.username, u.pp from comments c
        left join users u on u.id = c.owner
        left join relationships b on (b.owner = $1 and b.target = u.id and b.type = 2) or (b.owner = u.id and b.target = $2 and b.type = 2)
        where c.post = $1 and b is null ${str}
        order by c.owner = $1, created desc
        limit 12 offset $3
        `;
  return db.query(query, values).then((r) => r.rows);
};

const getPostImagesQ = (id: string, postid: string, guest: boolean) => {
  const query = guest
    ? `
        select images from posts p
        left join users u on u.id = p.owner
        where p.id = $1 and ispublic
    `
    : `
        select images from posts p
        left join users u on u.id = p.owner
        left join relationships f on f.owner = $1 and f.target = u.id and f.type = 0
        left join relationships b on (b.owner = u.id and f.target = $1 and f.type = 2) or (b.owner = $1 and f.target = u.id and f.type = 2)
        where p.id = $2 and (ispublic or f is not null or u.id = $1) and b is null
      `;
  const values = [id, postid];
  if (guest) values.shift();
  return db.query(query, values).then((r) => r.rows[0]?.images ?? null);
};
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
    left join relationships b on (b.owner = u.id and b.target = $1 and b.type = 2) or (b.target = u.id and b.owner = $1 and b.type = 2)
    left join p.id = $1 and
    (ispublic or f is not null or u.id = $1) and b is null
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
     left join relationships b on (b.owner = u.id and b.target = u.id and b.type = 2) or (b.target = u.id and b.owner = u.id and b.type = 2)
     where pl.post = $2 ${str} and b is null and
     LIMIT 12 offset $3
  `,
    values
  );
};

const postLikeQ = (id: string, postid: string) =>
  db.query(
    `
      insert into postlikes (owner, post)
      SELECT $1, $2
      FROM posts p
      left join users u on p.owner = u.id
      left join relationships f on f.owner = $1 and f.target = p.owner and f.type = 0
      left join relationships b on (b.owner = p.owner and b.target = $1 and b.type = 2) or (b.owner = $1 and b.target = p.owner and b.type = 2)
      where p.id = $2 and (ispublic or f is not null or u.id = $1) and b is null
      `,
    [id, postid]
  );

const postUnlikeQ = (id: string, postid: string) =>
  db.query(
    `
      DELETE FROM postlikes pl
      WHERE pl.owner = $1 and pl.post = $2
      AND exists (
        SELECT 1 FROM posts p
        left join users u on p.owner = u.id
        left join relationships f on f.owner = $1 and f.target = p.owner and f.type = 0
        left join relationships b on (b.owner = p.owner and f.target = $1 and f.type = 2) or (b.owner = $1 and b.target = p.owner and b.type = 2)
        where p.id = $2 and (ispublic or f is not null or u.id = $1) and b is null
      );
`,
    [id, postid]
  );

const postCommentQ = (id: string, postid: string, content: string) =>
  db
    .query(
      `
      insert into comments (owner, post, content)
      SELECT $1, $2, $3
      FROM posts p
      left join users u on p.owner = u.id
      left join relationships f on f.owner = $1 and f.target = p.owner and f.type = 0
      left join relationships b on (b.owner = p.owner and b.target = $1 and b.type = 2) or (b.owner = $1 and b.target = p.owner and b.type = 2)
      where p.id = $2 and (ispublic or f is not null or u.id = $1) and b is null
      returning id
  `,
      [id, postid, content]
    )
    .then((r) => r.rows[0].id);

export {
  getCommentsQ,
  getPostImagesQ,
  getPostLikesQ,
  getPostQ,
  postCommentQ,
  postLikeQ,
  postUnlikeQ,
};
