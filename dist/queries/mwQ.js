"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSessions = void 0;
const db_1 = __importDefault(require("../db/db"));
const checkSessions = (id, refreshid) => db_1.default
    .query("select 1 a from sessions where owner = $1 and refreshid = $2", [
    id,
    refreshid,
])
    .then((r) => r.rows[0].a == 1);
exports.checkSessions = checkSessions;
