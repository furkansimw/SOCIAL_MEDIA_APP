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
const getCommentLikesQ = () => {};

export {
  deleteCommentQ,
  getSubCommentsQ,
  commentLikeQ,
  commentUnLikeQ,
  getCommentLikesQ,
};
