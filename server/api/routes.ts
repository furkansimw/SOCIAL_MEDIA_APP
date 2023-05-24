import { Router } from "express";
import tokenMw from "../mw/tokenMw";
import authRoute from "./authRoute";
import postsRoute from "./postsRoute";
import profileRoute from "./profileRoute";

const apiRoute = Router();

apiRoute.use(tokenMw);
apiRoute.use("/auth", authRoute);
apiRoute.use("/posts", postsRoute);
apiRoute.use("/profile", profileRoute);

export default apiRoute;
