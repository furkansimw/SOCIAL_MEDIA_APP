import { FC } from "react";
import { IPost } from "../interfaces/ISlices";
import styled from "styled-components";

type props = {
  post: IPost;
};

const PostMini: FC<props> = ({ post }) => {
  return (
    <Container>
      <h1>PostMini</h1>
    </Container>
  );
};

const Container = styled.li``;

export default PostMini;
