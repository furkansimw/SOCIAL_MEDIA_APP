import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import apiRoute from "./api/routes";
import { errorHandler, routeNotFound } from "./mw/error";
import helmet from "helmet";
import create from "./db/create";

const app = express();
const port = process.env.PORT || 4000;
export const server = app.listen(port, async () => await create());

app.use(express.static("./dist/dist"));
app.use(express.json({ limit: "60mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());
app.use("/api", apiRoute);

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

app.use(errorHandler);
app.use(routeNotFound);
