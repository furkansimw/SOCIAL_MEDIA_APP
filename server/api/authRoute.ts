import express from "express";
const authRoute = express.Router();

import { login, signup, logOut } from "../controller/authController";

authRoute.route("/login").post(login);
authRoute.route("/signup").post(signup);
authRoute.route("/logout").post(logOut);

export default authRoute;
