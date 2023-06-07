"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.signup = exports.login = void 0;
const req_1 = __importDefault(require("./req"));
const login = (username, password) => (0, req_1.default)("/auth/login", "POST", { username, password });
exports.login = login;
const signup = (username, password, fullname, email) => (0, req_1.default)("/auth/signup", "POST", { username, password, fullname, email });
exports.signup = signup;
const logout = () => (0, req_1.default)(`/auth/logout`, `POST`);
exports.logout = logout;
