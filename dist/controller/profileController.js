"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFollowings = exports.getFollowers = exports.denyRequest = exports.allowRequest = exports.getRequests = exports.getMyNotifications = exports.updateProfile = exports.getMyProfileDetail = exports.unBlockUser = exports.blockUser = exports.unFollowUser = exports.followUser = exports.getMySaved = exports.getProfilePosts = exports.getProfile = exports.getMyProfile = exports.searchProfile = void 0;
const __1 = require("..");
const cloudinary_1 = require("../db/cloudinary");
const converter_1 = __importDefault(require("../functions/converter"));
const urlConverter_1 = __importDefault(require("../functions/urlConverter"));
const error_1 = require("../mw/error");
const profileQ_1 = require("../queries/profileQ");
const searchProfile = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { u } = req.query;
    const { guest, id } = res.locals;
    if (guest || u == undefined || typeof u != "string" || u.trim().length == 0)
        return (0, error_1.badRequest)();
    u = u.trim();
    const result = yield (0, profileQ_1.searchProfileQ)(id, u);
    res.json(result);
}));
exports.searchProfile = searchProfile;
const getMyProfile = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { guest, id } = res.locals;
    if (guest)
        (0, error_1.badRequest)();
    const result = yield (0, profileQ_1.getMyProfileQ)(id);
    res.json(result);
}));
exports.getMyProfile = getMyProfile;
const getProfile = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, guest } = res.locals;
    const { username } = req.params;
    const profile = yield (0, profileQ_1.getProfileQ)(id, username, guest);
    if (profile == null)
        (0, error_1.createError)("profile not found", 404);
    res.json(profile);
}));
exports.getProfile = getProfile;
const getProfilePosts = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, guest } = res.locals;
    const { username } = req.params;
    const last = (0, converter_1.default)(req.query);
    const profilePosts = yield (0, profileQ_1.getProfilePostsQ)(id, username, guest, last);
    res.json(profilePosts);
}));
exports.getProfilePosts = getProfilePosts;
const getMySaved = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, guest } = res.locals;
    if (guest)
        (0, error_1.badRequest)();
    const last = (0, converter_1.default)(req.query);
    const mySaved = yield (0, profileQ_1.getMySavedQ)(id, last);
    res.json(mySaved);
}));
exports.getMySaved = getMySaved;
const followUser = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, guest } = res.locals;
    const { userid } = req.body;
    if (guest || !userid || userid == id)
        (0, error_1.badRequest)();
    const type = yield (0, profileQ_1.followUserQ)(id, userid);
    if (type != undefined)
        __1.io.to((0, __1.findS)(userid)).emit("notifications", type);
    res.json(type);
}));
exports.followUser = followUser;
const unFollowUser = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, guest } = res.locals;
    const { userid } = req.body;
    if (guest || !userid)
        (0, error_1.badRequest)();
    yield (0, profileQ_1.unFollowUserQ)(id, userid);
    res.json({ status: "ok" });
}));
exports.unFollowUser = unFollowUser;
const blockUser = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, guest } = res.locals;
    const { userid } = req.body;
    if (guest || !userid)
        (0, error_1.badRequest)();
    if (userid == id)
        (0, error_1.badRequest)();
    yield (0, profileQ_1.blockUserQ)(id, userid);
    res.json({ status: "ok" });
}));
exports.blockUser = blockUser;
const unBlockUser = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, guest } = res.locals;
    const { userid } = req.body;
    if (guest || !userid)
        (0, error_1.badRequest)();
    yield (0, profileQ_1.unBlockUserQ)(id, userid);
    res.json({ status: "ok" });
}));
exports.unBlockUser = unBlockUser;
const getMyProfileDetail = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, guest } = res.locals;
    if (guest)
        (0, error_1.badRequest)();
    const detail = yield (0, profileQ_1.getMyProfileDetailQ)(id);
    res.json(detail);
}));
exports.getMyProfileDetail = getMyProfileDetail;
const updateProfile = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, guest } = res.locals;
    if (guest)
        (0, error_1.badRequest)();
    const { pp, username, email, fullname, bio, ispublic } = req.body;
    let values = {};
    if (fullname && fullname.length <= 50)
        values["fullname"] = fullname;
    try {
        if (pp != undefined && pp != null) {
            const url = yield (0, urlConverter_1.default)(id, pp);
            values["pp"] = url;
        }
        else if (pp == null) {
            values["pp"] = null;
            try {
                yield (0, cloudinary_1.destroy)(`${id}-pp`, "/pp");
            }
            catch (error) { }
        }
    }
    catch (error) {
        res.json(error);
        return;
    }
    const newBio = (bio !== null && bio !== void 0 ? bio : "").replace(/\n{2,}/g, "\n").trim();
    values["bio"] = newBio.length > 0 ? newBio : null;
    values.ispublic = ispublic || false;
    const usernamePattern = "^(?=.{6,36}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$";
    if (username != undefined &&
        new RegExp(usernamePattern).test(username) &&
        ![
            "explore",
            "accounts",
            "account",
            "myaccount",
            "mysaved",
            "mysaveds",
            "search",
            "myprofile",
        ].includes(username))
        values["username"] = username.toLowerCase();
    if (new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$").test(email))
        values["email"] = email;
    yield (0, profileQ_1.updateProfileQ)(id, values);
    res.json((values === null || values === void 0 ? void 0 : values.pp) || { status: "ok" });
}));
exports.updateProfile = updateProfile;
const getMyNotifications = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, guest } = res.locals;
    if (guest)
        (0, error_1.badRequest)();
    const notifications = yield (0, profileQ_1.getMyNotificationsQ)(id, (0, converter_1.default)(req.query));
    res.json(notifications);
}));
exports.getMyNotifications = getMyNotifications;
const getRequests = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, guest } = res.locals;
    if (guest)
        (0, error_1.badRequest)();
    const { l } = req.query;
    const requests = yield (0, profileQ_1.getRequestsQ)(id, (0, converter_1.default)(req.query), l);
    res.json(requests);
}));
exports.getRequests = getRequests;
const allowRequest = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, guest } = res.locals;
    const { ri } = req.query;
    if (guest || !ri || typeof ri != "string")
        return (0, error_1.badRequest)();
    yield (0, profileQ_1.allowRequestQ)(id, ri);
    res.json({ status: "ok" });
}));
exports.allowRequest = allowRequest;
const denyRequest = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, guest } = res.locals;
    const { ri } = req.query;
    if (guest || !ri || typeof ri != "string")
        return (0, error_1.badRequest)();
    yield (0, profileQ_1.denyRequestQ)(id, ri);
    res.json({ status: "ok" });
}));
exports.denyRequest = denyRequest;
const getFollowers = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, guest } = res.locals;
    const { u } = req.query;
    if (guest || typeof u != "string")
        return (0, error_1.badRequest)();
    const followers = yield (0, profileQ_1.getFollowersQ)(id, u, (0, converter_1.default)(req.query));
    res.json(followers);
}));
exports.getFollowers = getFollowers;
const getFollowings = (0, error_1.asyncErrorWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, guest } = res.locals;
    const { u } = req.query;
    if (guest || typeof u != "string")
        return (0, error_1.badRequest)();
    const followings = yield (0, profileQ_1.getFollowingQ)(id, u, (0, converter_1.default)(req.query));
    res.json(followings);
}));
exports.getFollowings = getFollowings;
