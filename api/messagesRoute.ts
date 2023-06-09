import { Router } from "express";
import mustBeLoggedin from "../mw/mustbeloggedin";
import { getRooms, startRoom, getRoom } from "../controller/messagesController";

const messagesRoute = Router();
messagesRoute.use(mustBeLoggedin);

messagesRoute.route("/start").post(startRoom);
messagesRoute.route("/rooms").get(getRooms);
messagesRoute.route("/rooms/:roomid").get(getRoom);

export default messagesRoute;
