"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.signup = exports.login = void 0;
const authControllersFunctions_1 = require("../functions/authControllersFunctions");
const error_1 = require("../mw/error");
const authQ_1 = require("../queries/authQ");
const authQ_2 = require("../queries/authQ");
const authControllersValidators_1 = require("../validators/authControllersValidators");
const login = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const isVal = (0, authControllersValidators_1.loginVal)(username, password);
    if (!isVal)
        (0, error_1.badRequest)();
    const id = yield (0, authQ_2.loginQ)(username, password);
    if (!id)
        (0, error_1.createError)("Username or password wrong !!!", 403);
    const refreshid = yield (0, authQ_2.createRefreshId)(id);
    (0, authControllersFunctions_1.cookieSetter)(res, id, refreshid);
    res.json({ status: "ok" });
}));
exports.login = login;
const signup = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, fullname, email } = req.body;
    const isVal = (0, authControllersValidators_1.signUpVal)(username, password, email, fullname);
    if (!isVal)
        (0, error_1.badRequest)();
    const id = yield (0, authQ_1.signUpQ)(username, email, password, fullname);
    const refreshid = yield (0, authQ_2.createRefreshId)(id);
    (0, authControllersFunctions_1.cookieSetter)(res, id, refreshid);
    res.status(201).json({ status: "ok" });
}));
exports.signup = signup;
const logOut = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const { refreshid } = req.cookies;
    yield (0, authQ_1.logoutQ)(id, refreshid);
    res.json({ status: "ok" });
}));
exports.logOut = logOut;
