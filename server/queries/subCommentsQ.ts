import db from "../db/db";
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

  return db
    .query(
      `
        select scl from subcommentlikes scl
        left join subcomments sc on sc.id = scl.subcomment
        left join comments c on c.id = sc.comment
        left join posts c on c.id = c.post
        left join users u on u.id = p.owner
        left join relationships f on f.owner = $1 and f.target = u.id and f.type = 0
        left join relationships b on !todo 
        where scl.subcomment = $2 ${str} and (u.ispublic or f is not null or u.id = $1) and b is null
        limit 12 offset $3
    `,
      values
    )
    .then(then);
};

export { getSubCommentLikesQ };
