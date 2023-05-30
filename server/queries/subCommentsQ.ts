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

  const str = sd ? ` ` : ``;

  return db
    .query(
      `
        
    `,
      values
    )
    .then(then);
};

export { getSubCommentLikesQ };
