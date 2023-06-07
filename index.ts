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
import cookieP from "./functions/cookieP";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
export const io = new Server(server);
let sessions: { userid: string; socketid: string }[] = [];

export const findS = (ui: string) =>
  sessions.find((s) => s.userid == ui)?.socketid || "";

io.use((socket, next) => {
  const cookies = cookieP(socket.handshake.headers.cookie || "");
  const token = cookies.token;

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET || "") as {
      id: string;
    };
    sessions.push({ userid: id, socketid: socket.id });
    next();
  } catch (error) {
    next(new Error("Error"));
  }
});
//
app.use(express.static(__dirname.replace("\\dist", "") + "\\client\\dist"));
app.use(express.json({ limit: "60mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());

app.use("/api", apiRoute);
app.use("/sessions", (req, res) => {
  res.json(sessions);
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    sessions = sessions.filter((s) => s.socketid != socket.id);
  });
});

app.get("*", (req, res) => {
  res.sendFile(__dirname.replace("\\dist", "") + "\\client\\dist");
});

app.use(errorHandler);
app.use(routeNotFound);
