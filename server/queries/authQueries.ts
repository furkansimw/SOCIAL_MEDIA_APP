import db from "../db/db";

const createRefreshId = (id: string) =>
  db
    .query("insert into sessions (owner) values ($1) returning refreshid", [id])
    .then((r) => r.rows[0].refreshid);

const loginQ = (username: string, password: string) =>
  db
    .query(`select id from users where username = $1 and crypt($1, password)`, [
      username,
      password,
    ])
    .then((r) => r.rows[0]?.id);

const signUpQ = (
  username: string,
  email: string,
  password: string,
  fullname: string
) =>
  db
    .query(
      `insert into users (username,email,password,fullname) values ($1,$2,$3,$4) returning id`,
      [username, email, password, fullname]
    )
    .then((r) => r.rows[0].id);

const logoutQ = (id: string, refreshid: string) =>
  db.query("delete from sessions where owner = $1 and refreshid = $2", [
    id,
    refreshid,
  ]);

export { createRefreshId, loginQ, signUpQ, logoutQ };
