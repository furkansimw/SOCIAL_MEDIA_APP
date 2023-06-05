import db from "../db/db";
import { cookieSetter } from "../functions/authControllersFunctions";
import { clearCookies } from "../functions/tokenMwFunctions";
import { asyncErrorWrapper, badRequest, createError } from "../mw/error";
import { logoutQ, signUpQ } from "../queries/authQ";
import { createRefreshId, loginQ } from "../queries/authQ";
import { loginVal, signUpVal } from "../validators/authControllersValidators";

const login = asyncErrorWrapper(async (req, res) => {
  const { username, password } = req.body;
  const isVal = loginVal(username, password);
  if (!isVal) badRequest();

  const id = await loginQ(username, password);
  if (!id) createError("Username or password wrong !!!", 403);

  const refreshid = await createRefreshId(id);

  cookieSetter(res, id, refreshid);
  res.json({ status: "ok" });
});

const signup = asyncErrorWrapper(async (req, res) => {
  const { username, password, fullname, email } = req.body;
  const isVal = signUpVal(username, password, email, fullname);
  if (!isVal) badRequest();

  const id = await signUpQ(username, email, password, fullname);

  const refreshid = await createRefreshId(id);

  cookieSetter(res, id, refreshid);
  res.status(201).json({ status: "ok" });
});

const logOut = asyncErrorWrapper(async (req, res) => {
  const { id } = req.body;
  const { refreshid } = req.cookies;
  await logoutQ(id, refreshid);
  clearCookies(res);
  res.json({ status: "ok" });
});

const password = asyncErrorWrapper(async (req, res) => {
  const { guest, id } = res.locals;
  if (guest) badRequest();
  const { op, np, adlo } = req.body;
  const u = await db.query(
    `select id from users
     where id = $1 and password = crypt($2,password)`,
    [id, op]
  );
  if (u.rows.length == 0) return createError("Wrong password", 403);
  await db.query(
    `update users set password = crypt($2, gen_salt('bf')) where id = $1`,
    [id, np]
  );
  if (adlo) await db.query(`delete from sessions where owner = $1`, [id]);
  const refreshid = await createRefreshId(id);

  cookieSetter(res, id, refreshid);
  res.json({ status: "ok" });
});

export { login, signup, logOut, password };
