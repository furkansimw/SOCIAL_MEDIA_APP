import db from "../db/db";
import blocked from "../functions/blocked";
import ILast from "../functions/last";
import then from "../functions/then";

const getSubCommentLikesQ = (
  id: string,
  subcommentid: string,
  last?: ILast
) => {
  const values: (string | number | Date)[] = [id, subcommentid];
  if (last) values.push(last.date, last.id);

  const str = last ? `and (scl.created, scl.id) < ($3, $4)` : ``;
  const b = blocked("p.owner, c.owner, sc.owner");
  return db
    .query(
      `
        select scl.*, sclu.username, sclu.fullname, sclu.pp, s.type status from subcommentlikes scl
        left join subcomments sc on sc.id = scl.subcomment
        left join comments c on c.id = sc.comment
        left join posts c on c.id = c.post
        left join users u on u.id = p.owner
        left join users sclu on sclu.id = scl.owner
        left join relationships s on s.owner = $1 and s.target = scl.owner
        left join relationships f on f.owner = $1 and f.target = p.owner and f.type = 0 ${b}
        WHERE scl.subcomment = $2 ${str} and (u.ispublic or f is not null or u.id = $1) and b is null
        order by scl.owner = $1 desc, scl.created desc
        limit 12
    `,
      values
    )
    .then(then);
};

const subCommentLikeQ = (id: string, subcommentid: string) =>
  db.query(
    `
      insert into subcommentlikes (owner, subcomment)
      SELECT $1, $2
      FROM posts p
      left join users u on p.owner = u.id
      left join subcomments sc on sc.id = $2
      left join comments c on c.id = sc.comment
      left join relationships f on f.owner = $1 and f.target = p.owner and f.type = 0
      ${blocked("p.owner, c.owner, sc.owner")}
      where p.id = c.post and (ispublic or f is not null or u.id = $1) and b is null
      and not exists (select 1 from subcommentlikes scl where scl.owner = $1 and scl.subcomment = $2)

  `,
    [id, subcommentid]
  );

const subCommentUnLikeQ = (id: string, subcommentid: string) =>
  db.query(
    `
      DELETE FROM subcommentlikes scl
      WHERE scl.subcomment = $2
      AND exists (
        SELECT 1 FROM posts p
        left join users u on p.owner = u.id
        left join subcomments sc on sc.id = scl.subcomment
        left join comments c on c.id = sc.comment
        left join relationships f on f.owner = $1 and f.target = p.owner and f.type = 0
        ${blocked("p.owner, c.owner, sc.owner")}
        where p.id = c.post and (u.ispublic or f is not null or u.id = $1) and b is null
      );
  `,
    [id, subcommentid]
  );

const deleteSubCommentQ = (id: string, subcommentid: string) =>
  db.query(
    `
  DELETE FROM subcomments sc
  WHERE sc.id = $2
  AND exists (
    SELECT 1 FROM posts p
    left join comments c on c.id = sc.comment
    left join users u on p.owner = u.id
    left join relationships f on f.owner = $1 and f.target = p.owner and f.type = 0
    ${blocked("p.owner, c.owner")}
    where p.id = c.post and (ispublic or f is not null or u.id = $1) and b is null

  `,
    [id, subcommentid]
  );

export {
  getSubCommentLikesQ,
  subCommentLikeQ,
  subCommentUnLikeQ,
  deleteSubCommentQ,
};
