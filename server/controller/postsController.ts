import { upload } from "../db/cloudinary";
import { asyncErrorWrapper, badRequest } from "../mw/error";
import { v4 } from "uuid";
import {
  getPostsQ,
  getExplorePostsQ,
  createPostQ,
  getPostQ,
  getPostImagesQ,
  getPostLikesQ,
  postLikeQ,
  postUnlikeQ,
  getCommentsQ,
  postCommentQ,
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

const getPostController = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  const { postid } = req.params;
  const post = await getPostQ(id, postid, guest);

  res.json(post);
});

const getPostImagesController = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  const { postid } = req.params;

  const images = await getPostImagesQ(id, postid, guest);
  res.json(images);
});

const getPostLikesController = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  if (guest) badRequest();

  const { postid } = req.params;

  const { offset, sd } = conv(req.query);

  const postLikes = await getPostLikesQ(id, postid, offset, sd);
  res.json(postLikes);
});

const postLikeController = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  const { postid } = req.params;
  if (guest) badRequest();
  await postLikeQ(id, postid);
  res.json({ status: "ok" });
});

const postUnlikeController = asyncErrorWrapper(async (req, res) => {
  const { id } = res.locals;
  const { postid } = req.params;
  await postUnlikeQ(id, postid);
  res.json({ status: "ok" });
});

const getCommentsController = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  const { postid } = req.params;
  const { offset, sd } = conv(req.query);
  // if out of session can only see first 12 comments
  if (guest && (offset >= 12 || sd != undefined)) badRequest();

  const postComments = await getCommentsQ(id, postid, guest, offset, sd);
  res.json(postComments);
});

const postCommentController = asyncErrorWrapper(async (req, res) => {
  const { id, guest } = res.locals;
  if (guest) badRequest();
  const { postid } = req.params;
  let { content }: { content?: string } = req.body;

  if (!content || content?.trim().length == 0) return badRequest();
  content = content.replace(/\n{2,}/g, "\n");

  const commentId = await postCommentQ(id, postid, content);
  res.json(commentId);
});

export {
  getPostsController,
  getExplorePostsController,
  createPostController,
  getPostController,
  getPostImagesController,
  getPostLikesController,
  postLikeController,
  postUnlikeController,
  getCommentsController,
  postCommentController,
};
