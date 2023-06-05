import { upload } from "../db/cloudinary";
import { asyncErrorWrapper, badRequest } from "../mw/error";
import { v4 } from "uuid";
import { getPostsQ, getExplorePostsQ, createPostQ } from "../queries/postsQ";
import conv from "../functions/converter";

const getPosts = asyncErrorWrapper(async (req, res) => {
  const { guest, id } = res.locals;
  if (guest) badRequest();
  const last = conv(req.query);
  const posts = await getPostsQ(id, last);
  res.json(posts);
});

const getExplorePosts = asyncErrorWrapper(async (req, res) => {
  const { guest, id } = res.locals;
  if (guest) badRequest();
  const last = conv(req.query);
  const posts = await getExplorePostsQ(id, last);
  res.json(posts);
});

const createPost = asyncErrorWrapper(async (req, res) => {
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

export { getPosts, getExplorePosts, createPost };
