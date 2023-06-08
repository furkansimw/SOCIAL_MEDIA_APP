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
  getMyNotifications,
  getRequests,
  allowRequest,
  denyRequest,
  getFollowers,
  getFollowings,
} from "../controller/profileController";

profileRoute.route("/search").get(searchProfile);
profileRoute.route("/my").get(getMyProfile);
profileRoute.route("/edit").get(getMyProfileDetail).post(updateProfile);
profileRoute.route("/mysaved").get(getMySaved);
profileRoute.route("/notifications").get(getMyNotifications);
profileRoute.route("/follow").post(followUser).delete(unFollowUser);
profileRoute.route("/followers").get(getFollowers);
profileRoute.route("/followings").get(getFollowings);
profileRoute.route("/block").post(blockUser).delete(unBlockUser);
profileRoute
  .route("/requests")
  .get(getRequests)
  .post(allowRequest)
  .delete(denyRequest);

const profileWithUsernameRoute = Router({ mergeParams: true });

profileRoute.use("/:username", profileWithUsernameRoute);

profileWithUsernameRoute.route("/").get(getProfile);
profileWithUsernameRoute.route("/posts").get(getProfilePosts);

export default profileRoute;
