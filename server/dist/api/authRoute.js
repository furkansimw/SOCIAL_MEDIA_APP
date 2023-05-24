"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoute = express_1.default.Router();
const authController_1 = require("../controller/authController");
authRoute.route("/login").post(authController_1.login);
authRoute.route("/signup").post(authController_1.signup);
authRoute.route("/logout").post(authController_1.logOut);
exports.default = authRoute;
