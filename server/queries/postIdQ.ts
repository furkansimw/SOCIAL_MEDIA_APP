import db from "../db/db";

const getCommentsQ = (
  id: string,
  postid: string,
  guest: boolean,
  offset: number,
  sd?: Date
) => {
  const values: (string | number | Date)[] = [id, postid, offset];
  if (sd) values.push(sd);
  if (guest) values.shift();
  const str = sd ? `and c.created < $4` : ``;
  const query = guest
    ? `
        select c.*, likecount::int, subcommentcount::int, u.username, u.pp from comments c
        left join users u on u.id = c.owner
        where c.post = $1
        order by c.created desc
        limit 12 offset $2
    `
    : `
        select c.*,likecount::int, subcommentcount::int, u.username, u.pp from comments c
        left join users u on u.id = c.owner
        left join relationships b on (b.owner = $1 and b.target = u.id and b.type = 2) or (b.owner = u.id and b.target = $1 and b.type = 2)
        where c.post = $2 and b is null ${str}
        order by c.owner = $2, created desc
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
    select p.*, likecount::int, commentcount::int, pl is not null isliked, s is not null issaved, (r.type not null and r.type == 0) isfollowing from posts p
    left join users u on u.id = p.owner
    left join postlikes pl on pl.post = p.id and pl.owner = $1
    left join saved s on s.post = p.id and pl.owner = $1
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
  const values: (string | number | Date)[] = [id, postid, offset];

  if (sd) values.push(sd);
  const str = sd ? `and pl.created < $4` : ``;

  return db
    .query(
      `
      todo
      `,
      values
    )
    .then((r) => r.rows);
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

const postSaveQ = (id: string, postid: string) =>
  db.query(
    `
    insert into saved (owner, post)
    SELECT $1, $2
    FROM posts p
    left join users u on p.owner = u.id
    left join relationships f on f.owner = $1 and f.target = p.owner and f.type = 0
    left join relationships b on (b.owner = p.owner and b.target = $1 and b.type = 2) or (b.owner = $1 and b.target = p.owner and b.type = 2)
    where p.id = $2 and (ispublic or f is not null or u.id = $1) and b is null
    `,
    [id, postid]
  );

const postUnSaveQ = (id: string, postid: string) =>
  db.query(
    `
      DELETE FROM saved s
      WHERE s.owner = $1 and s.post = $2
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

export {
  getCommentsQ,
  getPostImagesQ,
  getPostLikesQ,
  getPostQ,
  postCommentQ,
  postLikeQ,
  postUnlikeQ,
  postSaveQ,
  postUnSaveQ,
};
