import db from "../db/db";

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
  postid: string,
  commentid: string,
  offset: number,
  sd?: Date
) => {
  const values: (string | number | Date)[] = [id, postid, commentid, offset];
  if (sd) values.push(sd);

  const str = sd ? `and sc.created < $${guest ? 4 : 5}  ` : ``;

  const query = guest
    ? `
    select sc.*,u.username, u.pp, sc.likecount::int from subcomments sc
    left join comments c on c.id = sc.comment
    left join posts p on p.id = c.post
    left join users u on u.id = p.owner
    where sc.comment = $2 and ispublic ${str}
    order by sc.created desc
    limit 12 offset $3
    `
    : `
    select sc.*, scou.username, scou.pp, sc.likecount::int from subcomments sc
    left join comments c on c.id = sc.comment left join posts p on p.id = c.post
    left join users pou on pou.id = p.owner
    left join users scou on scou.id = sc.owner
    left join users cou on cou.id = c.owner
    left join relationships b on (b.owner = $1 and b.target = p.owner and b.type = 2) or (b.owner = p.owner and b.target = $1 and b.type = 2) or (b.owner = c.owner and b.target = $1 and b.type = 2) or (b.owner = c.owner and b.target = $1 and b.type = 2)
    left join relationships pof on (pof.owner = $1 and pof.target = p.owner and pof.type = 0)
    left join relationships cof on (cof.owner = $1 and cof.target = p.owner and cof.type = 0)
    where sc.comment = $3 ${str} and
    (pou.ispublic or pof is not null or pou.id = $2) and
    (cou.ispublic or cof is not null or cou.id = $1) and
    b is null
    order by sc.created desc
    limit 12 offset $4
    `;

  return db.query(query, values).then((r) => r.rows);
};
const commentLikeQ = () => {};
const commentUnLikeQ = () => {};
const getCommentLikesQ = (
  id: string,
  postid: string,
  commentid: string,
  offset: number,
  sd?: Date
) => {
  const values: (string | number | Date)[] = [id, postid, commentid, offset];
  if (sd) values.push(sd);

  db.query(
    `
    todo
  `,
    values
  );
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
      left join relationships b on (b.owner = c.owner and b.target = $1 and b.type = 2) or (b.owner = $1 and b.target = c.owner and b.type = 2)
      where c.id = $2 and (ispublic or f is not null or u.id = $1) and b is null and exists (
        SELECT 1
        FROM comments c
        left join posts p on c.post = p.id
        left join users u on p.owner = u.id
        left join relationships f on f.owner = $1 and f.target = p.owner and f.type = 0
        left join relationships b on (b.owner = p.owner and b.target = $1 and b.type = 2) or (b.owner = $1 and b.target = p.owner and b.type = 2)
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
