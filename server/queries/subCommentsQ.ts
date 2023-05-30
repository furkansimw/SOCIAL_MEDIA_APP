import db from "../db/db";
import blocked from "../functions/blocked";
import then from "../functions/then";

const getSubCommentLikesQ = (
  id: string,
  subcommentid: string,
  offset: number,
  sd?: Date
) => {
  const values: (string | number | Date)[] = [id, subcommentid, offset];
  if (sd) values.push(sd);

  const str = sd ? `and scl.created < $4` : ``;
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
        limit 12 offset $3
    `,
      values
    )
    .then(then);
};

export { getSubCommentLikesQ };
