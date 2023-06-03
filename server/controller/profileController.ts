import conv from "../functions/converter";
import { asyncErrorWrapper, badRequest, createError } from "../mw/error";
import {
  searchProfileQ,
  getMyProfileQ,
  getProfileQ,
  getProfilePostsQ,
  getMySavedQ,
  followUserQ,
  unFollowUserQ,
  blockUserQ,
  unBlockUserQ,
  getMyProfileDetailQ,
  updateProfileQ,
} from "../queries/profileQ";

const searchProfile = asyncErrorWrapper(async (req, res) => {
  let { u } = req.query;
  const { guest, id } = res.locals;
  if (guest || u == undefined || typeof u != "string" || u.trim().length == 0)
    return badRequest();
  u = u.trim();
  const result = await searchProfileQ(id, u);
  res.json(result);
});

const getMyProfile = asyncErrorWrapper(async (req, res) => {
  const { guest, id } = res.locals;
  if (guest) badRequest();
  const result = await getMyProfileQ(id);
  res.json(result);
});

const getProfile = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  const { username } = req.params;
  const profile = await getProfileQ(id, username, guest);
  if (profile == null) createError("profile not found", 404);
  res.json(profile);
});

const getProfilePosts = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  const { username } = req.params;
  const last = conv(req.query);
  const profilePosts = await getProfilePostsQ(id, username, guest, last);
  res.json(profilePosts);
});

const getMySaved = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  if (guest) badRequest();
  const last = conv(req.query);
  const mySaved = await getMySavedQ(id, last);
  res.json(mySaved);
});

const followUser = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  const { userid } = req.body;
  if (guest || !userid) badRequest();
  await followUserQ(id, userid);
  res.json({ status: "ok" });
});

const unFollowUser = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  const { userid } = req.body;
  if (guest || !userid) badRequest();
  await unFollowUserQ(id, userid);
  res.json({ status: "ok" });
});

const blockUser = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  const { userid } = req.body;
  if (guest || !userid) badRequest();
  await blockUserQ(id, userid);
  res.json({ status: "ok" });
});

const unBlockUser = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  const { userid } = req.body;
  if (guest || !userid) badRequest();
  await unBlockUserQ(id, userid);
  res.json({ status: "ok" });
});

const getMyProfileDetail = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  if (guest) badRequest();
  const detail = await getMyProfileDetailQ(id);
  res.json(detail);
});
const updateProfile = asyncErrorWrapper(async (req, res) => {
  res.json({ status: "ok" });
});

export {
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
};
