import React, { FC } from "react";
import { IPost } from "../interfaces/ISlices";

type props = {
  post: IPost;
};

const PostItemHome: FC<props> = ({ post }) => {
  return <div>PostItemHome</div>;
};

export default PostItemHome;
