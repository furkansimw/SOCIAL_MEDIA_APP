import { upload } from "../db/cloudinary";
import { asyncErrorWrapper, badRequest } from "../mw/error";
import { v4 } from "uuid";
import { createPostQ, getPostQ } from "../queries/postsQueries";

type bodyType = {
  images: string[];
  content: string;
};

const createPostController = asyncErrorWrapper(async (req, res) => {
  const { guest, id } = res.locals;
  if (guest) badRequest();

  const postid = v4();

  const { images, content }: bodyType = req.body;
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

export { createPostController, getPostController };
