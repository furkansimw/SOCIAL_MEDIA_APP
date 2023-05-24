import { asyncErrorWrapper, badRequest } from "../mw/error";
import { searchProfileQ, getProfileQ } from "../queries/profileQ";

const searchProfile = asyncErrorWrapper(async (req, res) => {
  const { u } = req.query;
  const { guest, id } = res.locals;
  if (guest || u == undefined || typeof u != "string") return badRequest();
  const result = await searchProfileQ(id, u);
  res.json(result);
});

const getProfile = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  if (guest) badRequest();
  const { username } = req.params;
  const profile = await getProfileQ(id, username);
  res.json(profile);
});

export { searchProfile, getProfile };
