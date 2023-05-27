import styled from "styled-components";
import { IComment } from "../../interfaces/ISlices";
import LoadingBox from "../LoadingBox";
import { shallowEqual, useSelector } from "react-redux";
import { selectCurrentPost, setBack } from "../../redux/postsReducer";
import { AppDispatch, RootState } from "../../redux/store";
import { dateCalc } from "./Bottom";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LikeIconComment } from "../Icons";
import { likeComment } from "../../api/posts";

const Data = () => {
  const postid = window.location.pathname.split("/")[2];
  const {
    comments: { data, loading },
  } = useSelector(
    (s: RootState) => selectCurrentPost(s, postid),
    shallowEqual
  )!;

  return (
    <DataContainer>
      <Content />
      {data.map((comment) => (
        <CommentItem comment={comment} />
      ))}
      {loading && <LoadingBox />}
    </DataContainer>
  );
};

const DataContainer = styled.ul`
  height: calc(100% - 138px - 4rem);
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .loading-box {
    margin: 1rem 0px;
  }

  padding: 1rem;
  .content {
    display: flex;
    margin-bottom: 1rem;
    .pp {
      margin-right: 18px;
      a {
        width: 2rem;
        height: 2rem;
        display: block;
        img {
          border-radius: 100%;
          width: 100%;
          height: 100%;
        }
      }
    }
    .text {
      font-size: 14px;
      a {
        margin-right: 4px;
        font-weight: 600;
      }
      p {
        font-size: 12px;
        color: #a8a8a8;
      }
    }
  }

  .commentitem {
    margin-bottom: 1rem;
    .upside {
      display: flex;
      width: 100%;
      align-items: start;
      .pp {
        min-width: 2rem;
        width: 2rem;
        height: 2rem;
        margin-right: 18px;
        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
          border-radius: 100%;
        }
      }
      pre {
        font-size: 14px;
        width: 100%;
        white-space: pre-wrap;
        word-wrap: break-word;
        overflow: hidden;
        a {
          font-weight: 600;
          margin-right: 6px;
        }
      }
      button {
        padding: 4px;
        margin-left: 1rem;
        background-color: transparent;
        &:hover {
          opacity: 0.7;
          &.active {
            opacity: 1;
          }
        }
        &.active {
          @keyframes likep {
            0% {
              transform: scale(1);
            }
            25% {
              transform: scale(1.2);
            }
            50% {
              transform: scale(0.95);
            }
            100% {
              transform: scale(1);
            }
          }
          animation: likep 0.45s ease-in-out;
        }
      }
    }
  }
`;

const Content = () => {
  const postid = window.location.pathname.split("/")[2];
  const { pp, username, content, created } = useSelector(
    (s: RootState) => selectCurrentPost(s, postid),
    shallowEqual
  )!;

  const date = useMemo(() => dateCalc(created), []);

  const dispatch = useDispatch<AppDispatch>();

  const close = () => dispatch(setBack(null));

  return (
    <div className="content">
      <div className="pp">
        <Link to={`/${username}`} replace onClick={close}>
          <img src={pp || "/pp.jpg"} alt="pp" />
        </Link>
      </div>
      <div className="text">
        <pre>
          <Link to={`/${username}`} replace onClick={close}>
            {username}
          </Link>
          {content}
        </pre>
        <p>{date}</p>
      </div>
    </div>
  );
};

const CommentItem = ({ comment }: { comment: IComment }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    id: commentid,
    username,
    pp,
    subcommentcount,
    content,
    isliked,
  } = comment;

  const postid = window.location.pathname.split("/")[2];

  const likeSubComment = () =>
    dispatch(likeComment({ a: !isliked, commentid, postid }));

  return (
    <div className="commentitem">
      <div className="upside">
        <div className="pp">
          <Link to={`/${username}`} replace>
            <img src={pp || "/pp.jpg"} alt="pp" />
          </Link>
        </div>
        <pre>
          <Link to={`/${username}`} replace>
            {username}
          </Link>
          {content}
        </pre>
        <button onClick={likeSubComment} className={isliked ? "active" : ""}>
          <LikeIconComment isactive={isliked} />
        </button>
      </div>
      {subcommentcount > 0 && <div className="view-replies"></div>}
    </div>
  );
};

export default Data;
