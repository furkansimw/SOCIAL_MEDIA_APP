import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { getComments } from "../../../api/posts";
import Info from "./Info";
import Data, { Refs } from "./Data";
import Bottom from "./Bottom";
import { useSelector } from "react-redux";
import { selectCurrentPost } from "../../../redux/postsReducer";
import { startSmoothScroll } from "./functions";

const PostPopupComments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const postid = window.location.pathname.split("/")[2];
  const {
    comments: { hasmore, data, sending },
  } = useSelector(selectCurrentPost, shallowEqual)!;

  useEffect(() => {
    if (hasmore && data.length == 0) dispatch(getComments({ postid }));
  }, []);

  const [comment, setComment] = useState("");
  const commentInputRef = useRef<HTMLInputElement>(null);
  const [isRepliying, setIsRepliying] = useState<{
    commentid: string;
    username: string;
    offset: number;
  } | null>(null);

  const [i, _i] = useState(false);

  useEffect(() => {
    _i(true);
  }, []);

  useEffect(() => {
    if (!i) return;
    if (!sending) {
      if (isRepliying) scrollTop(totalHeight);
      else scrollTop(dataRef.current.contentRef.current!.clientHeight || 0);
      setComment("");
    }
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

  const [totalHeight, setTotalHeight] = useState(0);

  const scrollTop = (top: number) =>
    startSmoothScroll(dataRef.current.dataContainerRef.current!, top, 500);

  const dataContainerRef = useRef<HTMLUListElement>(null);

  const contentRef = useRef<HTMLDivElement>(null);

  const dataRef = useRef<Refs>({
    dataContainerRef,
    contentRef,
  });

  useEffect(() => {
    if (!isRepliying) return;
    if (dataRef.current.dataContainerRef.current) {
      const childElements = Array.from(
        dataRef.current.dataContainerRef.current.children
      );

      const index =
        data.findIndex((obj) => obj.id == isRepliying.commentid) + 2;
      let heightSum = 0;
      for (let i = 0; i < index; i++) {
        console.log(childElements[i]);
        heightSum += childElements[i].clientHeight;
      }

      var subCommentClientHeight = 0;
      var a: any = Array.from(childElements[index].children);
      const el: Element = a[1];
      if (el.children.length == 3) {
        subCommentClientHeight = el.children[2].clientHeight;
      }

      console.log({ heightSum, subCommentClientHeight });
      setTotalHeight(heightSum + subCommentClientHeight - 8);
    }
  }, [data, isRepliying]);

  return (
    <Container>
      <Info />
      <Data reply={reply} ref={dataRef} />
      <Bottom ref={commentInputRef} {...{ comment, setComment, isRepliying }} />
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
