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
  const query = guest
    ? `
 
    `
    : `

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
    .then((r) => r.rows[0]?.id);

export {
  deleteCommentQ,
  getSubCommentsQ,
  commentLikeQ,
  commentUnLikeQ,
  getCommentLikesQ,
  createSubCommentQ,
};
