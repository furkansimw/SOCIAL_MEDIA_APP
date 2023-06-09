import db from "../db/db";
import blocked from "../functions/blocked";
import ILast from "../functions/last";

const getCommentsQ = (
  id: string,
  postid: string,
  guest: boolean,
  last?: ILast
) => {
  const values: (string | number | Date)[] = [id, postid];
  if (last) values.push(last.date, last.id);
  if (guest) values.shift();
  const str = last ? `and (c.created, c.id) < ($3, $4)` : ``;
  const query = guest
    ? `
        select c.*, likecount::int, subcommentcount::int, u.username, u.pp from comments c
        left join users u on u.id = c.owner
        where c.post = $1
        order by c.created desc
        limit 12
    `
    : `
        select c.*,likecount::int, subcommentcount::int, u.username,cl is not null isliked, u.pp from comments c
        left join commentlikes cl on cl.comment = c.id
        left join users u on u.id = c.owner
        left join relationships b on (b.owner = $1 and b.target = u.id and b.type = 2) or (b.owner = u.id and b.target = $1 and b.type = 2)
        where c.post = $2 and b is null ${str}
        order by c.owner = $2, created desc
        limit 12
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
    select p.*,u.username, u.pp, likecount::int, commentcount::int from posts p
    left join users u on u.id = p.owner
    where p.id = $1 and ispublic
  `
    : `
    select p.*, u.username, u.pp, likecount::int, commentcount::int, pl is not null isliked, s is not null issaved, f is not null isfollowing from posts p
    left join users u on u.id = p.owner
    left join postlikes pl on pl.post = p.id and pl.owner = $1
    left join saved s on s.post = p.id and pl.owner = $1
    left join relationships f on f.owner = $1 and f.target = u.id and f.type = 0
    left join relationships b on (b.owner = u.id and b.target = $1 and b.type = 2) or (b.target = u.id and b.owner = $1 and b.type = 2)
    where p.id = $2 and b is null and (ispublic or f is not null or u.id = $1)
    `;
  return db.query(query, values).then((r) => r.rows[0] || null);
};

const getPostLikesQ = (id: string, postid: string, last?: ILast) => {
  const values: (string | number | Date)[] = [id, postid];

  if (last) values.push(last.date, last.id);

  const str = last ? `and (pl.created, pl.id) < ($3, $4)` : ``;

  const b = blocked("pou.id, plou.id");

  return db
    .query(
      `
      select plou.username, plou.pp, plou.fullname, plou.ispublic, plou.id, f.type status from postlikes pl
      left join users plou on plou.id = pl.owner
      left join posts p on p.id = pl.post
      left join users pou on pou.id = p.owner ${b}
      left join relationships f on (f.owner = $1 and f.target = pl.owner)
      where pl.post = $2 ${str} and b is null
      order by pl.owner = $1 desc, pl.created desc
      limit 12
      `,
      values
    )
    .then((r) => r.rows);
};

const postLikeQ = (id: string, postid: string, postowner: string) =>
  db
    .query(
      `
      insert into postlikes (owner, post)
      SELECT $1, $2 FROM posts p
      left join users u on p.owner = u.id
      left join relationships f on f.owner = $1 and f.target = p.owner and f.type = 0
      ${blocked("p.owner")}
      where p.id = $2 and (ispublic or f is not null or u.id = $1) and p.owner = $3 and b is null and not exists (select 1 from postlikes pl where pl.owner = $1 and pl.post = $2)
      returning id
      `,
      [id, postid, postowner]
    )
    .then((r) => {
      if (r.rows[0]?.id) return postowner;
    });

const postUnlikeQ = (id: string, postid: string) =>
  db.query(
    `
      DELETE FROM postlikes pl
      WHERE pl.owner = $1 and pl.post = $2
      AND exists (
        SELECT 1 FROM posts p
        left join users u on p.owner = u.id
        left join relationships f on f.owner = $1 and f.target = p.owner and f.type = 0
        ${blocked("p.owner")}
        where p.id = $2 and (ispublic or f is not null or u.id = $1) and b is null
      );
`,
    [id, postid]
  );

const postCommentQ = (
  id: string,
  postid: string,
  content: string,
  powner: string
) =>
  db
    .query(
      `
      insert into comments (owner, post, content)
      SELECT $1, $2, $3
      FROM posts p
      left join users u on p.owner = u.id
      left join relationships f on f.owner = $1 and f.target = p.owner and f.type = 0
      ${blocked("p.owner")}
      where p.id = $2 and (ispublic or f is not null or u.id = $1) and b is null and p.owner = $4
      returning id
  `,
      [id, postid, content, powner]
    )
    .then((r) => r.rows[0]?.id);

const postSaveQ = (id: string, postid: string) =>
  db.query(
    `
    insert into saved (owner, post)
    SELECT $1, $2
    FROM posts p
    left join users u on p.owner = u.id
    left join relationships f on f.owner = $1 and f.target = p.owner and f.type = 0
    ${blocked("p.owner")}
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
        ${blocked("p.owner")}
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
