"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profileRoute = (0, express_1.Router)();
const profileController_1 = require("../controller/profileController");
profileRoute.route("/search").get(profileController_1.searchProfile);
profileRoute.route("/my").get(profileController_1.getMyProfile);
profileRoute.route("/edit").get(profileController_1.getMyProfileDetail).post(profileController_1.updateProfile);
profileRoute.route("/mysaved").get(profileController_1.getMySaved);
profileRoute.route("/notifications").get(profileController_1.getMyNotifications);
profileRoute.route("/follow").post(profileController_1.followUser).delete(profileController_1.unFollowUser);
profileRoute.route("/block").post(profileController_1.blockUser).delete(profileController_1.unBlockUser);
profileRoute
    .route("/requests")
    .get(profileController_1.getRequests)
    .post(profileController_1.allowRequest)
    .delete(profileController_1.denyRequest);
const profileWithUsernameRoute = (0, express_1.Router)({ mergeParams: true });
profileRoute.use("/:username", profileWithUsernameRoute);
profileWithUsernameRoute.route("/").get(profileController_1.getProfile);
profileWithUsernameRoute.route("/posts").get(profileController_1.getProfilePosts);
exports.default = profileRoute;
