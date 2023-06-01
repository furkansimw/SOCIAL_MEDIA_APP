import db from "../db/db";
import blocked from "../functions/blocked";
import ILast from "../functions/last";
import then from "../functions/then";

const deleteCommentQ = (id: string, postid: string, commentid: string) =>
  db.query(
    `
    DELETE FROM comments c
    WHERE c.id = $3
    AND exists (
      SELECT 1 FROM posts p
      left join users u on p.owner = u.id
      left join relationships f on f.owner = $1 and f.target = p.owner and f.type = 0
      ${blocked("p.owner")}
      where p.id = $2 and (ispublic or f is not null or u.id = $1) and b is null
    );
  `,
    [id, postid, commentid]
  );
const getSubCommentsQ = (
  guest: boolean,
  id: string,
  commentid: string,
  last?: ILast
) => {
  const values: (string | number | Date)[] = [id, commentid];
  if (last) values.push(last.date, last.id);

  const str = last
    ? `and (sc.created, sc.id) < ($${guest ? 2 : 3}, $${guest ? 3 : 4})`
    : ``;

  const query = guest
    ? `
    select sc.*,u.username, u.pp, sc.likecount::int from subcomments sc
    left join comments c on c.id = sc.comment
    left join posts p on p.id = c.post
    left join users u on u.id = p.owner
    where sc.comment = $1 and ispublic ${str}
    order by sc.created desc
    limit 12
    `
    : `
    select sc.*, scou.username, scou.pp, sc.likecount::int, scl is not null isliked from subcomments sc
    left join comments c on c.id = sc.comment left join posts p on p.id = c.post
    left join subcommentlikes scl on scl.subcomment = sc.id and scl.owner = $1
    left join users pou on pou.id = p.owner
    left join users scou on scou.id = sc.owner
    ${blocked("c.owner, p.owner")}
    left join relationships pof on (pof.owner = $1 and pof.target = p.owner and pof.type = 0)
    where sc.comment = $2 ${str} and
    (pou.ispublic or pof is not null or pou.id = $1) and
    b is null
    order by sc.created desc
    limit 12
    `;

  return db.query(query, values).then(then);
};
const commentLikeQ = (id: string, postid: string, commentid: string) =>
  db.query(
    `
    insert into commentlikes (owner, comment)
    SELECT $1, $3
    FROM posts p
    left join users u on p.owner = u.id
    left join comments c on c.id = $3
    left join relationships f on f.owner = $1 and f.target = p.owner and f.type = 0
    ${blocked("p.owner, c.owner")}
    where p.id = $2 and (ispublic or f is not null or u.id = $1) and b is null
    and not exists (select 1 from commentlikes cl where cl.owner = $1 and cl.comment = $3)
  `,
    [id, postid, commentid]
  );
const commentUnLikeQ = (id: string, postid: string, commentid: string) =>
  db.query(
    `
        DELETE FROM commentlikes cl
        WHERE cl.comment = $3
        AND exists (
          SELECT 1 FROM posts p
          left join users u on p.owner = u.id
          left join comments c on c.id = $2
          left join relationships f on f.owner = $1 and f.target = p.owner and f.type = 0
          ${blocked("p.owner, c.owner")}
          where p.id = $2 and (u.ispublic or f is not null or u.id = $1) and b is null
        );
`,
    [id, postid, commentid]
  );
const getCommentLikesQ = (id: string, commentid: string, last?: ILast) => {
  const values: (string | number | Date)[] = [id, commentid];
  if (last) values.push(last.date, last.id);

  const str = last ? `(cl.created, cl.id) < ($3, $4) and` : ``;

  const b = blocked("p.owner, c.owner, cl.owner");

  return db
    .query(
      `
    select cl.*, clou.username, clou.pp, clou.fullname, clor.type status from commentlikes cl
    left join users clou on clou.id = cl.owner
    left join comments c on c.id = cl.comment
    left join posts p on p.id = c.post
    left join users pou on pou.id = p.owner
    left join relationships clor on clor.id = cl.owner
    left join relationships pouf on pouf.owner = $1 and pouf.target = pou.id and pouf.type = 0 ${b}
    where cl.comment = $2 and ${str} b is null and (pou.ispublic or pouf is not null or pou.id = $1)
    order by cl.owner = $1 desc, cl.created desc
    limit 12
  `,
      values
    )
    .then(then);
};

const createSubCommentQ = (id: string, commentid: string, content: string) =>
  db
    .query(
      `
      insert into subcomments (owner, comment, content)
      SELECT $1, $2, $3
      FROM comments c
      left join users u on c.owner = u.id
      left join relationships f on f.owner = $1 and f.target = c.owner and f.type = 0
      ${blocked("c.owner")}
      where c.id = $2 and (ispublic or f is not null or u.id = $1) and b is null and exists (
        SELECT 1
        FROM comments c
        left join posts p on c.post = p.id
        left join users u on p.owner = u.id
        left join relationships f on f.owner = $1 and f.target = p.owner and f.type = 0
        ${blocked("p.owner")}
        where c.id = $2 and (ispublic or f is not null or u.id = $1) and b is null
      )
      returning id
`,
      [id, commentid, content]
    )
    .then((r) => r.rows[0].id);

export {
  deleteCommentQ,
  getSubCommentsQ,
  commentLikeQ,
  commentUnLikeQ,
  getCommentLikesQ,
  createSubCommentQ,
};
