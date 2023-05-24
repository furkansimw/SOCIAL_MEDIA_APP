import React, { FC } from "react";
import { IPost } from "../interfaces/ISlices";
import styled from "styled-components";

type props = {
  post: IPost;
};

const PostItemHome: FC<props> = ({ post }) => {
  return (
    <Container>
      <h1>Container</h1>
    </Container>
  );
};

const Container = styled.li``;

export default PostItemHome;
