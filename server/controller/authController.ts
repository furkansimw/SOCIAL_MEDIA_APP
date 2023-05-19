import { cookieSetter } from "../functions/authControllersFunctions";
import { asyncErrorWrapper, badRequest, createError } from "../mw/error";
import { logoutQ, signUpQ } from "../queries/authQueries";
import { createRefreshId, loginQ } from "../queries/authQueries";
import { loginVal } from "../validators/authControllersValidators";
import { signUpVal } from "../validators/authControllersValidators";

const loginController = asyncErrorWrapper(async (req, res) => {
  const { username, password } = req.body;
  const isVal = loginVal(username, password);
  if (!isVal) badRequest();

  const id = await loginQ(username, password);
  if (!id) createError("Username or password wrong !!!", 403);

  const refreshid = await createRefreshId(id);

  cookieSetter(res, id, refreshid);
  res.json({ status: "ok" });
});

const signupController = asyncErrorWrapper(async (req, res) => {
  const { username, password, fullname, email } = req.body;
  const isVal = signUpVal(username, password, email, fullname);
  if (!isVal) badRequest();

  const id = await signUpQ(username, email, password, fullname);

  const refreshid = await createRefreshId(id);

  cookieSetter(res, id, refreshid);
  res.status(201).json({ status: "ok" });
});

const logOutController = asyncErrorWrapper(async (req, res) => {
  const { id } = req.body;
  const { refreshid } = req.cookies;
  await logoutQ(id, refreshid);
  res.json({ status: "ok" });
});

export { loginController, signupController, logOutController };
