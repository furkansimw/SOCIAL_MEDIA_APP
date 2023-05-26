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
    owner,
    pp,
    isfollowing,
    username,
    comments: { data, hasmore, loading, sending },
    id,
  } = cp;
  // const { username, id, pp } = useSelector(selectValues);

  useEffect(() => {
    if (hasmore && data.length == 0) dispatch(getComments({ postid: id }));
  }, []);

  const to = `/${username}`;

  const [comment, setComment] = useState("");
  const commentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setComment("");
  }, [sending]);

  return (
    <Container>
      <Info {...{ pp, username, to, isfollowing }} />
      <Data {...{ data, hasmore, loading }} />
      <Bottom ref={commentInputRef} {...{ comment, setComment, sending, id }} />
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
