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
  }, [postid]);

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
    if (!i) return;
    if (!sending) {
      if (isRepliying) scrollTop(totalHeight);
      else scrollTop(dataRef.current.contentRef.current!.clientHeight || 0);
      setComment("");
    }
  }, [sending]);

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
      var cE = Array.from(dataRef.current.dataContainerRef.current.children);
      cE = cE.slice(1);
      const cCI = data.findIndex((obj) => obj.id == isRepliying.commentid);
      let heightSum = 0;
      for (let i = 0; i <= cCI; i++) heightSum += cE[i].clientHeight;
      setTotalHeight(
        heightSum + dataRef.current.contentRef.current?.clientHeight!
      );
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
`;

export default PostPopupComments;
