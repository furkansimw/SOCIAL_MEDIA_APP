import db from "../db/db";
import blocked from "../functions/blocked";
import then from "../functions/then";

const deleteCommentQ = (id: string, postid: string, commentid: string) =>
  db.query(
    `
    DELETE FROM comments c
    WHERE cd.id = $3
    AND exists (
      SELECT 1 FROM posts p
      left join users u on p.owner = u.id
      left join relationships f on f.owner = $1 and f.target = p.owner and f.type = 0
      left join relationships b on (b.owner = p.owner and f.target = $1 and f.type = 2) or (b.owner = $1 and b.target = p.owner and b.type = 2)
      where p.id = $2 and (ispublic or f is not null or u.id = $1) and b is null
    );
  `,
    [id, postid, commentid]
  );
const getSubCommentsQ = (
  guest: boolean,
  id: string,
  commentid: string,
  offset: number,
  sd?: Date
) => {
  const values: (string | number | Date)[] = [id, commentid, offset];
  if (sd) values.push(sd);

  const str = sd ? `and sc.created < $${guest ? 3 : 4} ` : ``;

  const query = guest
    ? `
    select sc.*,u.username, u.pp, sc.likecount::int from subcomments sc
    left join comments c on c.id = sc.comment
    left join posts p on p.id = c.post
    left join users u on u.id = p.owner
    where sc.comment = $1 and ispublic ${str}
    order by sc.created desc
    limit 12 offset $2
    `
    : `
    select sc.*, scou.username, scou.pp, sc.likecount::int from subcomments sc
    left join comments c on c.id = sc.comment left join posts p on p.id = c.post
    left join users pou on pou.id = p.owner
    left join users scou on scou.id = sc.owner
    ${blocked("c.owner, p.owner")}
    left join relationships pof on (pof.owner = $1 and pof.target = p.owner and pof.type = 0)
    where sc.comment = $2 ${str} and
    (pou.ispublic or pof is not null or pou.id = $1) and
    b is null
    order by sc.created desc
    limit 12 offset $3
    `;

  return db.query(query, values).then(then);
};
const commentLikeQ = () => {};
const commentUnLikeQ = () => {};
const getCommentLikesQ = (
  id: string,
  commentid: string,
  offset: number,
  sd?: Date
) => {
  const values: (string | number | Date)[] = [id, commentid, offset];
  if (sd) values.push(sd);

  const str = sd ? ` cl.created < $4 and` : ``;

  const b = blocked("p.owner, c.owner, cl.owner");

  return db
    .query(
      `
    select cl.*, clou.username, clou.pp, f.type status from commentlikes cl
    left join users clou on clou.id = cl.owner
    left join comments c on c.id = cl.comment
    left join posts p on p.id = c.post
    left join users pou on pou.id = p.owner
    left join relationships pouf on pouf.owner = $1 and pouf.target = pou.id and pouf.type = 0 ${b}
    where commmet = $2 and ${str} b is null and (pou.ispublic or pouf is not null or pou.id = $1)
    order by cl.owner = $1, cl.created desc
    limit 12 offset $3
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
