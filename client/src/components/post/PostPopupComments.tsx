import { FC, useEffect, useRef, useState } from "react";
import { IPost } from "../../interfaces/ISlices";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getComments } from "../../api/posts";
import Info from "./Info";
import Data from "./Data";
import Bottom from "./Bottom";
import { useSelector } from "react-redux";
import { selectCurrentPost } from "../../redux/postsReducer";

const PostPopupComments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const postid = window.location.pathname.split("/")[2];
  const cp = useSelector((s: RootState) => selectCurrentPost(s, postid))!;

  const {
    comments: { hasmore, data, sending },
  } = cp;

  useEffect(() => {
    if (hasmore && data.length == 0) dispatch(getComments({ postid }));
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
