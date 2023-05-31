import conv from "../functions/converter";
import { asyncErrorWrapper, badRequest } from "../mw/error";
import {
  searchProfileQ,
  getMyProfileQ,
  getProfileQ,
  getProfilePostsQ,
} from "../queries/profileQ";

const searchProfile = asyncErrorWrapper(async (req, res) => {
  const { u } = req.query;
  const { guest, id } = res.locals;
  if (guest || u == undefined || typeof u != "string") return badRequest();
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
  res.json(profile);
});

const getProfilePosts = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  const { username } = req.params;
  const { offset, sd } = conv(req.query);
  const profilePosts = await getProfilePostsQ(id, username, guest, offset, sd);
  res.json(profilePosts);
});

export { searchProfile, getMyProfile, getProfile, getProfilePosts };
