import db from "../db/db";

const checkSessions = (id: string, refreshid: string) =>
  db
    .query("select 1 a from sessions where owner = $1 and refreshid = $2", [
      id,
      refreshid,
    ])
    .then((r) => {
      console.log(r.rows);
      return r.rows[0].a == 1;
    });

export { checkSessions };
