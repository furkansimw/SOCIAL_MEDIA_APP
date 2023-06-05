"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCookies = void 0;
const clearCookies = (res) => {
    res.clearCookie("isloggedin");
    res.clearCookie("refreshid");
    res.clearCookie("token");
    res.status(401).json({ message: "Unauthorized" });
};
exports.clearCookies = clearCookies;
