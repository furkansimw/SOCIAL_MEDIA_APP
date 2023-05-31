import { Router } from "express";
const profileRoute = Router();
import {
  searchProfile,
  getMyProfile,
  getProfile,
  getProfilePosts,
} from "../controller/profileController";

profileRoute.route("/search").get(searchProfile);
profileRoute.route("/my").get(getMyProfile);

const profileWithUsernameRoute = Router({ mergeParams: true });

profileRoute.use("/:username", profileWithUsernameRoute);

profileWithUsernameRoute.route("/").get(getProfile);

profileWithUsernameRoute.route("/posts").get(getProfilePosts);

export default profileRoute;
