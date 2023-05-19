import { upload } from "../db/cloudinary";
import { asyncErrorWrapper, badRequest } from "../mw/error";
import { v4 } from "uuid";
import { createPostQ, getPostQ, getPostLikesQ } from "../queries/postsQueries";
import conv from "../functions/converter";

const createPostController = asyncErrorWrapper(async (req, res) => {
  const { guest, id } = res.locals;
  if (guest) badRequest();

  const postid = v4();

  const {
    images,
    content,
  }: {
    images: string[];
    content: string;
  } = req.body;
  const urls = await Promise.all(
    images.map((img, i) => upload(img, `${postid}-${i}`, "posts"))
  );
  const postId = await createPostQ(id, urls, content);
  res.status(201).json(postId);
});

const getPostController = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  const { postid } = req.params;
  const post = await getPostQ(id, postid, guest);

  res.json(post);
});

const getPostLikesController = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  if (guest) badRequest();

  const { postid } = req.params;

  const { offset, sd } = conv(req.query);

  const postLikes = await getPostLikesQ(id, postid, offset, sd);
  res.json(postLikes);
});

export { createPostController, getPostController, getPostLikesController };
