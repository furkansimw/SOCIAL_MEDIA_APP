import { Router } from "express";
import mustBeLoggedin from "../mw/mustbeloggedin";
import {
  getRooms,
  startRoom,
  getRoom,
  sendMessage,
  getMessages,
  deleteMessage,
  getPostW,
} from "../controller/messagesController";

const messagesRoute = Router();
messagesRoute.use(mustBeLoggedin);

messagesRoute.route("/post/:postid").get(getPostW);
messagesRoute.route("/start").post(startRoom);
messagesRoute.route("/rooms").get(getRooms);

const roomIdRoute = Router({ mergeParams: true });
messagesRoute.use("/rooms/:roomid", roomIdRoute);
roomIdRoute.route("/").get(getRoom).post(sendMessage);

roomIdRoute.route("/messages").get(getMessages);
roomIdRoute.route("/messages/:messageid").delete(deleteMessage);

export default messagesRoute;
