import { Router } from "express";
import mustBeLoggedin from "../mw/mustbeloggedin";
import { getRooms } from "../controller/messagesController";

const messagesRoute = Router();
messagesRoute.use(mustBeLoggedin);

messagesRoute.route("/rooms").get(getRooms);

export default messagesRoute;
