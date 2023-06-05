import express from "express";
const authRoute = express.Router();

import { login, signup, logOut, password } from "../controller/authController";

authRoute.route("/login").post(login);
authRoute.route("/signup").post(signup);
authRoute.route("/password").post(password);
authRoute.route("/logout").post(logOut);

export default authRoute;
