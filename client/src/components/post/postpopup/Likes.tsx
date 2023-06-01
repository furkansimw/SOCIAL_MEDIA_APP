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
import { useSelector } from "react-redux";
import { selectValues } from "../../../redux/profileReducer";
import { shallowEqual } from "react-redux";
import LinkQ from "../LinkQ";

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
    setHasmore(data.length == 1);
    setLoading(false);
  };

  useEffect(() => {
    if (type == "post") getPostLikes({ postid }).then(next);
    else if (type == "comment")
      getCommentLikes({ postid, commentid: commentid! }).then(next);
    else
      getSubCommentLikes({
        postid,
        commentid: commentid!,
        subcommentid: subcommentid!,
      }).then(next);
  }, []);

  const onScroll = (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
    const { created: date, id } = likes[likes.length - 1];

    if (loading || !hasmore) return;
    const { scrollTop, clientHeight, scrollHeight } = e.target as Element;
    if (scrollTop + clientHeight + 40 > scrollHeight) {
      setLoading(true);
      if (type == "post") getPostLikes({ postid, id, date }).then(next);
      else if (type == "comment")
        getCommentLikes({
          postid,
          commentid: commentid!,
          id,
          date,
        }).then(next);
      else
        getSubCommentLikes({
          postid,
          commentid: commentid!,
          subcommentid: subcommentid!,
          id,
          date,
        }).then(next);
    }
  };
  const con = (s: null | number) => {
    if (s == null) return `Follow`;
  };

  const { username: myusername } = useSelector(selectValues, shallowEqual);

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
        <ul onScroll={onScroll} className="contentx">
          {loading && <LoadingBox />}
          {likes.map((obj) => (
            <li>
              <LinkQ className="pp" to={`/${obj.username}`}>
                <img src={obj.pp || "/pp.jpg"} alt="pp" />
              </LinkQ>
              <div className="text">
                <LinkQ to={`/${obj.username}`}>
                  <p className="username">{obj.username}</p>
                </LinkQ>
                {obj.fullname && <p className="fullname">{obj.fullname}</p>}
              </div>
              {obj.username != myusername && <button>{con(obj.status)}</button>}
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
  .contentx {
    height: calc(100% - 42px);
    overflow-y: auto;
    .loading-box {
      margin: 2rem 0px;
      position: relative;
      height: 2rem;
      background-color: transparent;
    }
    li {
      display: flex;
      height: 60px;
      padding: 0.5rem 1rem;
      align-items: center;
      .pp {
        width: 44px;
        height: 44px;
        margin-right: 12px;
        display: block;
        img {
          width: 44px;
          height: 44px;
          border-radius: 100%;
        }
      }
      .text {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 36px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        p {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 18px;
          font-size: 14px;
          margin: 0px;
          &.username {
            font-weight: 600;
          }
          &.fullname {
            color: #a8a8a8;
            font-weight: 400;
          }
        }
      }
      button {
        margin-left: 12px;
        padding: 7px 1rem;
        border-radius: 8px;
        background-color: #0095f6;
        font-size: 14px;
        font-weight: 600;
        color: #fafafa;
        &:hover {
          opacity: 0.8;
        }
      }
    }
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
