import { Router } from "express";
import tokenMw from "../mw/tokenMw";
import authRoute from "./authRoute";
import postsRoute from "./postsRoute";

const apiRoute = Router();

apiRoute.use(tokenMw);
apiRoute.use("/auth", authRoute);
apiRoute.use("/posts", postsRoute);

export default apiRoute;
