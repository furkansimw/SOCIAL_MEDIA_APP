"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tokenMw_1 = __importDefault(require("../mw/tokenMw"));
const authRoute_1 = __importDefault(require("./authRoute"));
const postsRoute_1 = __importDefault(require("./postsRoute"));
const profileRoute_1 = __importDefault(require("./profileRoute"));
const messagesRoute_1 = __importDefault(require("./messagesRoute"));
const apiRoute = (0, express_1.Router)();
apiRoute.use(tokenMw_1.default);
apiRoute.use("/auth", authRoute_1.default);
apiRoute.use("/posts", postsRoute_1.default);
apiRoute.use("/profile", profileRoute_1.default);
apiRoute.use("/messages", messagesRoute_1.default);
// apiRoute.get("/test", async (req, res) => {
//   const xd = "00d15d7b-1622-4491-a285-d80be7d7e72d";
//   const xe = "7611aaa1-720b-4e2c-ac6d-eb688a1de87d";
//   const a = await db.query(
//     `
//     select * from rooms
//     where $1 = any(select unnest(members) from rooms where id = $2)
//     `,
//     [xd, xe]
//   );
//   res.json(a.rows);
// });
exports.default = apiRoute;
