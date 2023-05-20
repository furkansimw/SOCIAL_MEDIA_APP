import { upload } from "../db/cloudinary";
import { asyncErrorWrapper, badRequest } from "../mw/error";
import { v4 } from "uuid";
import {
  getPostsQ,
  getExplorePostsQ,
  createPostQ,
} from "../queries/postsQueries";
import conv from "../functions/converter";

const getPostsController = asyncErrorWrapper(async (req, res) => {
  const { guest, id } = res.locals;
  if (guest) badRequest();
  const { offset, sd } = conv(req.query);
  const posts = await getPostsQ(id, offset, sd);
  res.json(posts);
});

const getExplorePostsController = asyncErrorWrapper(async (req, res) => {
  const { guest, id } = res.locals;
  if (guest) badRequest();
  const { offset, sd } = conv(req.query);
  const posts = await getExplorePostsQ(id, offset, sd);
  res.json(posts);
});

const createPostController = asyncErrorWrapper(async (req, res) => {
  const { guest, id } = res.locals;
  if (guest) badRequest();

  const postid = v4();

  let {
    images,
    content,
  }: {
    images: string[];
    content?: string;
  } = req.body;
  const urls = await Promise.all(
    images.map((img, i) => upload(img, `${postid}-${i}`, "posts"))
  );
  content = content?.trim()?.replace(/\n{2,}/g, "\n");
  const postId = await createPostQ(id, urls, content);
  res.status(201).json(postId);
});

//

export { getPostsController, getExplorePostsController, createPostController };
