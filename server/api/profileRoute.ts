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
  getMyProfileDetail,
  updateProfile,
} from "../controller/profileController";

profileRoute.route("/search").get(searchProfile);
profileRoute.route("/my").get(getMyProfile);
profileRoute.route("/edit").get(getMyProfileDetail).post(updateProfile);
profileRoute.route("/mysaved").get(getMySaved);
profileRoute.route("/follow").post(followUser).delete(unFollowUser);
profileRoute.route("/block").post(blockUser).delete(unBlockUser);

const profileWithUsernameRoute = Router({ mergeParams: true });

profileRoute.use("/:username", profileWithUsernameRoute);

profileWithUsernameRoute.route("/").get(getProfile);
profileWithUsernameRoute.route("/posts").get(getProfilePosts);

export default profileRoute;
