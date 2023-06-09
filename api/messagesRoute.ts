import { Router } from "express";
import mustBeLoggedin from "../mw/mustbeloggedin";
import {
  getRooms,
  startRoom,
  getRoom,
  sendMessage,
} from "../controller/messagesController";

const messagesRoute = Router();
messagesRoute.use(mustBeLoggedin);

messagesRoute.route("/start").post(startRoom);
messagesRoute.route("/rooms").get(getRooms);
messagesRoute.route("/rooms/:roomid").get(getRoom).post(sendMessage);

export default messagesRoute;
