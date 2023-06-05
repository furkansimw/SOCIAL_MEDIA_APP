"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mustBeLoggedin = (req, res, next) => {
    const { guest } = res.locals;
    if (guest)
        res.status(403).json({ message: "Forbidden" });
    next();
};
exports.default = mustBeLoggedin;
