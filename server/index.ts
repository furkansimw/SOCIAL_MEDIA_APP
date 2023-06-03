import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import apiRoute from "./api/routes";
import { errorHandler, routeNotFound } from "./mw/error";
import create from "./db/create";
import helmet from "helmet";

const app = express();
const port = process.env.PORT || 4000;
const origin = process.env.ORIGIN || "http://localhost:5173";

const server = app.listen(port, async () => await create());
app.use((req, res, next) => {
  setTimeout(() => {
    next();
  }, 200);
});

app.use(express.json({ limit: "60mb" }));
app.use(cookieParser());
app.use(cors({ origin, credentials: true }));
app.use(morgan("dev"));
app.use(helmet());

app.use("/api", apiRoute);

app.use(errorHandler);
app.use(routeNotFound);
