import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import {
  getCommentLikes,
  getPostLikes,
  getSubCommentLikes,
} from "../../../api/posts";
import { ILikes } from "../../../interfaces/ISlices";
import LoadingBox from "../../LoadingBox";
import { CloseIcon } from "../../Icons";

type Props = {
  quit: () => void;
  type: "post" | "comment" | "subcomment";
  postid: string;
  commentid?: string;
  subcommentid?: string;
};

const Likes: FC<Props> = ({ quit, postid, commentid, subcommentid, type }) => {
  const [loading, setLoading] = useState(true);
  const [hasmore, setHasmore] = useState(true);
  const [likes, setLikes] = useState<ILikes[]>([]);
  useEffect(() => {
    const worker = (e: KeyboardEvent) => {
      if (e.key == "Escape") quit();
    };
    window.addEventListener("keydown", worker);
    return () => {
      window.removeEventListener("keydown", worker);
    };
  }, []);

  const next = (data: ILikes[]) => {
    setLikes([...likes, ...data]);
    setHasmore(data.length == 12);
    setLoading(false);
  };

  useEffect(() => {
    getPostLikes({ id: postid, offset: 0 }).then(next);
  }, []);

  const onScroll = (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
    if (loading || !hasmore) return;
    const { scrollTop, clientHeight, scrollHeight } = e.target as Element;
    if (scrollTop + clientHeight + 40 > scrollHeight) {
      setLoading(true);
      if (type == "post")
        getPostLikes({
          id: postid,
          offset: likes.length,
          sd: likes[0].created,
        }).then(next);
      else if (type == "comment")
        getCommentLikes({
          id: postid,
          commentid: commentid!,
          offset: likes.length,
          sd: likes[0].created,
        }).then(next);
      else
        getSubCommentLikes({
          id: postid,
          commentid: commentid!,
          subcommentid: subcommentid!,
          offset: likes.length,
          sd: likes[0].created,
        }).then(next);
    }
  };
  const con = (s: null | number) => {
    if (s == null) return `Follow`;
  };
  return (
    <>
      <Bg onClick={quit} />
      <Container>
        <div className="headerxxx">
          <p>Likes</p>
          <button onClick={quit}>
            <CloseIcon />
          </button>
        </div>
        <ul onScroll={onScroll} className="content">
          {loading && <LoadingBox />}
          {likes.map((obj) => (
            <li>
              <img src={obj.pp || "/pp.jpg"} alt="pp" />
              <div className="text">
                <p className="username">{obj.username}</p>
                <p className="fullname">{obj.fullname}</p>
              </div>
              <button>{con(obj.status)}</button>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
};

const Bg = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1300;
`;

const Container = styled.div`
  transform: scale(1.2);
  @keyframes scx {
    from {
      transform: scale(1.2);
    }
    to {
      transform: scale(1);
    }
  }
  animation: scx 0.1s ease-in-out forwards;
  width: 400px;
  background-color: #262626;
  border-radius: 8px;
  height: 400px;
  position: fixed;
  z-index: 1400;
  left: calc(50% - 200px);
  top: calc(50% - 200px);
  border-radius: 1rem;
  overflow: hidden;
  .headerxxx {
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-weight: 600;
    border-bottom: 1px solid #363636;
    button {
      width: 2rem;
      height: 2rem;
      position: absolute !important;
      right: 10px;
    }
  }
  .content {
    height: calc(100% - 42px);
    overflow-y: auto;
  }
  @media screen and (max-width: 464px) {
    left: 2rem;
    width: calc(100% - 4rem);
  }
  @media screen and (max-height: 464px) {
    top: 2rem;
    max-height: calc(100% - 4rem);
  }
`;

export default Likes;
