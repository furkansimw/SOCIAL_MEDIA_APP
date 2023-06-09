import { Router } from "express";
import tokenMw from "../mw/tokenMw";
import authRoute from "./authRoute";
import postsRoute from "./postsRoute";
import profileRoute from "./profileRoute";
import messagesRoute from "./messagesRoute";
import db from "../db/db";

const apiRoute = Router();

apiRoute.use(tokenMw);
apiRoute.use("/auth", authRoute);
apiRoute.use("/posts", postsRoute);
apiRoute.use("/profile", profileRoute);
apiRoute.use("/messages", messagesRoute);
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

export default apiRoute;
