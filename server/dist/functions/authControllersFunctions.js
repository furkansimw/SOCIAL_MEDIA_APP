"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieSetter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookieSetter = (res, id, refreshid) => {
    const token = jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET || "-", {
        expiresIn: "1h",
    });
    const maxAge = 1000 * 60 * 60 * 24 * 365;
    const httpOnly = true;
    res.cookie("isloggedin", true, { maxAge });
    res.cookie("token", token, { maxAge, httpOnly });
    res.cookie("refreshid", refreshid, { maxAge, httpOnly });
};
exports.cookieSetter = cookieSetter;
