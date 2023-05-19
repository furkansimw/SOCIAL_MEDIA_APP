import express from "express";
const authRoute = express.Router();

import {
  loginController,
  signupController,logOutController
} from "../controller/authController";

authRoute.route("/login").post(loginController);
authRoute.route("/signup").post(signupController);
authRoute.route('/logout').post(logOutController)

export default authRoute;
