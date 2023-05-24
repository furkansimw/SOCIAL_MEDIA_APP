import { Router } from "express";
const profileRoute = Router();
import { searchProfile, getProfile } from "../controller/profileController";

profileRoute.route("/search").get(searchProfile);
profileRoute.route("/:username").get(getProfile);

export default profileRoute;
