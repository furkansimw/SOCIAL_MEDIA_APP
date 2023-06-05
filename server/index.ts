import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import apiRoute from "./api/routes";
import { errorHandler, routeNotFound } from "./mw/error";
import helmet from "helmet";
import create from "./db/create";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;
export const server = app.listen(port, async () => await create());
const origin = process.env.ORIGIN || "http://localhost:4000";

app.use(express.json({ limit: "60mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin, credentials: true }));

app.use("/api", apiRoute);

app.use(errorHandler);
app.use(routeNotFound);
