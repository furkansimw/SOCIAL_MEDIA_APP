"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncErrorWrapper = exports.routeNotFound = exports.errorHandler = exports.badRequest = exports.createError = void 0;
const pg_1 = require("pg");
class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.message = message;
        this.status = status;
    }
}
const createError = (message, status) => {
    if (!status)
        status = 400;
    throw new CustomError(message, status);
};
exports.createError = createError;
const badRequest = () => createError("Bad request", 400);
exports.badRequest = badRequest;
const routeNotFound = (req, res) => res.status(404).json({ message: "Route not found" });
exports.routeNotFound = routeNotFound;
const asyncErrorWrapper = (fn) => (req, res, next) => fn(req, res, next).catch(next);
exports.asyncErrorWrapper = asyncErrorWrapper;
const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        res.status(err.status).json({ message: err.message });
    }
    else if (err instanceof pg_1.DatabaseError) {
        if (err.code == "23505") {
            let message = "Internal Server Error";
            if (err.detail)
                message = parser(err.detail);
            return res.status(500).json({ message });
        }
        else {
            const message = err.message || "Internal Server Error";
            return res.status(500).json({ message });
        }
    }
    else {
        const message = err.message || "Internal Server Error";
        res.status(500).json({ message });
    }
};
exports.errorHandler = errorHandler;
const parser = (str) => str.split("=")[1].replace(")", "").replace("(", "");
