import { FC, useEffect, useRef, useState } from "react";
import { IComment, IPost, ISubComment } from "../../interfaces/ISlices";
import styled from "styled-components";
import { shallowEqual, useDispatch } from "react-redux";
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
  const cp = useSelector(
    (s: RootState) => selectCurrentPost(s, postid),
    shallowEqual
  )!;

  const {
    comments: { hasmore, data, sending },
  } = cp;

  useEffect(() => {
    if (hasmore && data.length == 0) dispatch(getComments({ postid }));
  }, []);

  const [comment, setComment] = useState("");
  const commentInputRef = useRef<HTMLInputElement>(null);
  const [isRepliying, setIsRepliying] = useState<{
    commentid: string;
    username: string;
    offset: number;
    element?: Element;
  } | null>(null);

  useEffect(() => {
    setComment("");
  }, [sending]);

  const reply = (commentid: string, username: string) => {
    setComment(`@${username} `);
    setIsRepliying({
      commentid,
      username,
      offset: dataContainerRef.current?.scrollTop || 0,
    });
    commentInputRef.current?.focus();
  };

  useEffect(() => {
    if (isRepliying) {
      const { username } = isRepliying;
      if (comment.slice(0, username.length + 2) != `@${username} `) {
        setIsRepliying(null);
        setComment("");
      }
    }
  }, [comment]);

  const scrollTop = (top: number) =>
    dataContainerRef.current?.scroll({ top, behavior: "smooth" });

  const dataContainerRef = useRef<HTMLUListElement>(null);

  return (
    <Container>
      <Info />
      <Data reply={reply} ref={dataContainerRef} />
      <Bottom
        ref={commentInputRef}
        {...{ comment, setComment, isRepliying, scrollTop }}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-width: 240px;
  max-width: 400px;
  height: 100%;
  @media screen and (max-width: 820px) {
    display: none;
  }
`;

export default PostPopupComments;
