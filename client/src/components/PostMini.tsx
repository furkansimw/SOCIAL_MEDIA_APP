import React, { FC } from "react";
import { IPost } from "../interfaces/ISlices";

type props = {
  post: IPost;
};

const PostMini: FC<props> = ({ post }) => {
  return <div>PostMini</div>;
};

export default PostMini;
