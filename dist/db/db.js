"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const error_1 = require("../mw/error");
const connectionString = process.env.DB_URL;
if (!connectionString)
    (0, error_1.createError)("Connection string not defined");
const db = new pg_1.Pool({ connectionString });
exports.default = db;
