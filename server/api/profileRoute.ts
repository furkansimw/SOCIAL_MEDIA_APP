import { Router } from "express";
const profileRoute = Router();
import {
  searchProfile,
  getMyProfile,
  getProfile,
  getProfilePosts,
  getMySaved,
  followUser,
  unFollowUser,
  blockUser,
  unBlockUser,
} from "../controller/profileController";

profileRoute.route("/search").get(searchProfile);
profileRoute.route("/my").get(getMyProfile);
profileRoute.route("/mysaved").get(getMySaved);

const profileWithUsernameRoute = Router({ mergeParams: true });

profileRoute.use("/:username", profileWithUsernameRoute);

profileWithUsernameRoute.route("/").get(getProfile);
profileWithUsernameRoute.route("/follow").post(followUser).delete(unFollowUser);
profileWithUsernameRoute.route("/block").post(blockUser).delete(unBlockUser);
profileWithUsernameRoute.route("/posts").get(getProfilePosts);

export default profileRoute;
