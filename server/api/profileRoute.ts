import { Router } from "express";
const profileRoute = Router();
import {
  searchProfile,
  getMyProfile,
  getProfile,
} from "../controller/profileController";

profileRoute.route("/search").get(searchProfile);
profileRoute.route("/my").get(getMyProfile);
profileRoute.route("/:username").get(getProfile);

export default profileRoute;
