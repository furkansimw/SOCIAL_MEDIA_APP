"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutQ = exports.signUpQ = exports.loginQ = exports.createRefreshId = void 0;
const db_1 = __importDefault(require("../db/db"));
const createRefreshId = (id) => db_1.default
    .query("insert into sessions (owner) values ($1) returning refreshid;", [
    id,
])
    .then((r) => r.rows[0].refreshid);
exports.createRefreshId = createRefreshId;
const loginQ = (username, password) => db_1.default
    .query(`select id from users where username = $1 and password = crypt($2, password);`, [username, password])
    .then((r) => { var _a; return (_a = r.rows[0]) === null || _a === void 0 ? void 0 : _a.id; });
exports.loginQ = loginQ;
const signUpQ = (username, email, password, fullname) => db_1.default
    .query(`
      INSERT INTO users (username, email, password, fullname) 
      VALUES ($1, $2, crypt($3, gen_salt('bf')), $4) 
      RETURNING id;
      `, [username, email, password, fullname])
    .then((r) => r.rows[0].id);
exports.signUpQ = signUpQ;
const logoutQ = (id, refreshid) => db_1.default.query("delete from sessions where owner = $1 and refreshid = $2", [
    id,
    refreshid,
]);
exports.logoutQ = logoutQ;
