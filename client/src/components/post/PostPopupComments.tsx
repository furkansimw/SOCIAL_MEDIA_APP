import { FC, useEffect, useRef, useState } from "react";
import { IPost } from "../../interfaces/ISlices";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getComments } from "../../api/posts";
import Info from "./Info";
import Data from "./Data";
import Bottom from "./Bottom";

type Props = {
  cp: IPost;
};

const PostPopupComments: FC<Props> = ({ cp }) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    comments: { hasmore, data, sending },
  } = cp;

  useEffect(() => {
    if (hasmore && data.length == 0) dispatch(getComments({ postid: id }));
  }, []);

  const [comment, setComment] = useState("");
  const commentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setComment("");
  }, [sending]);

  return (
    <Container>
      <Info />
      <Data />
      <Bottom ref={commentInputRef} {...{ comment, setComment }} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-width: 240px;
  max-width: 400px;
  height: 100%;
  @media screen and (max-width: 750px) {
    display: none;
  }
`;

export default PostPopupComments;
