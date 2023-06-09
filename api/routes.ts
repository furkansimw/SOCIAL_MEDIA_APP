import { Router } from "express";
import tokenMw from "../mw/tokenMw";
import authRoute from "./authRoute";
import postsRoute from "./postsRoute";
import profileRoute from "./profileRoute";
import messagesRoute from "./messagesRoute";

const apiRoute = Router();

apiRoute.use(tokenMw);
apiRoute.use("/auth", authRoute);
apiRoute.use("/posts", postsRoute);
apiRoute.use("/profile", profileRoute);
apiRoute.use("/messages", messagesRoute);

export default apiRoute;
