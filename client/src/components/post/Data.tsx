import styled from "styled-components";
import { IComment } from "../../interfaces/ISlices";
import LoadingBox from "../LoadingBox";
import { shallowEqual, useSelector } from "react-redux";
import { selectCurrentPost, setBack } from "../../redux/postsReducer";
import { AppDispatch, RootState } from "../../redux/store";
import { dateCalc } from "./Bottom";
import { forwardRef, useMemo } from "react";
import { useDispatch } from "react-redux";
import { LikeIconComment, MoreIcon2 } from "../Icons";
import { getComments, likeComment } from "../../api/posts";
import LinkConverter from "./LinkConverter";
import LinkQ from "./LinkQ";
import { toggleSubCommetsT } from "../../redux/postsReducer";

type Props = {
  reply: (commentid: string, username: string) => void;
};

const Data = forwardRef<HTMLUListElement, Props>(({ reply }, ref) => {
  const postid = window.location.pathname.split("/")[2];
  const {
    comments: { data, loading },
  } = useSelector(
    (s: RootState) => selectCurrentPost(s, postid),
    shallowEqual
  )!;

  return (
    <DataContainer ref={ref}>
      <Content />
      {data.map((comment) => (
        <CommentItem key={comment.id} comment={comment} reply={reply} />
      ))}
      {loading && <LoadingBox />}
    </DataContainer>
  );
});

const DataContainer = styled.ul`
  height: calc(100% - 147px - 4rem);
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
        &.b {
          font-weight: 400;
          color: #e0f1ff;
        }
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
        margin-top: 4px;
      }
    }
  }

  .commentitem {
    margin-bottom: 1rem;
    &:hover {
      .down-side {
        .more {
          display: block;
        }
      }
    }
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
        margin-bottom: 4px;
        font-size: 14px;
        width: 100%;
        white-space: pre-wrap;
        word-wrap: break-word;
        overflow: hidden;
        a {
          font-weight: 600;
          margin-right: 6px;
          &.b {
            margin: 0px;
            font-weight: 400;
            color: #e0f1ff;
          }
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
    .down-side {
      height: 18px;
      align-items: center;
      display: flex;
      .date {
        margin-left: calc(2rem + 18px);
        font-size: 12px;
        color: #a8a8a8;
        margin-right: 12px;
      }
      .reply {
        font-weight: 600;
        background-color: transparent;
        margin-right: 12px;
        color: #a8a8a8;
        font-size: 12px;
      }
      .more {
        height: 18px;
        width: 18px;
        background-color: transparent;
        display: none;
      }
    }
    .view-replies {
      margin-left: 50px;
      margin-top: 1rem;
      .up {
        display: flex;
        align-items: center;
        button {
          display: flex;
          background-color: transparent;
          align-items: center;
          .line {
            width: 24px;
            background-color: #a8a8a8;
            height: 1px;
            margin-right: 1rem;
          }
          p {
            font-size: 12px;
            color: #a8a8a8;
            font-weight: 600;
          }
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

  return (
    <div className="content">
      <div className="pp">
        <LinkQ to={`/${username}`}>
          <img src={pp || "/pp.jpg"} alt="pp" />
        </LinkQ>
      </div>
      <div className="text">
        <pre>
          <LinkQ to={`/${username}`}>{username}</LinkQ>
          <LinkConverter text={content || ""} />
        </pre>
        <p>{date}</p>
      </div>
    </div>
  );
};

const CommentItem = ({
  comment,
  reply,
}: {
  comment: IComment;
  reply: (commentid: string, username: string) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    id: commentid,
    username,
    pp,
    subcommentcount,
    content,
    isliked,
    created,
    subcomments: { data, hasmore, t, loading },
  } = comment;

  const postid = window.location.pathname.split("/")[2];
  const likeSubComment = () =>
    dispatch(likeComment({ a: !isliked, commentid, postid }));

  const date = useMemo(() => dateCalc(created), []);

  const replyHandle = () => reply(commentid, username);

  const view = () => {
    if (!hasmore) dispatch(toggleSubCommetsT({ postid, commentid, t: !t }));
    dispatch(
      getComments({
        postid,
        commentid,
        offset: data.length,
        sd: data[0]?.created,
      })
    );
  };

  return (
    <div className="commentitem">
      <div className="upside">
        <div className="pp">
          <LinkQ to={`/${username}`}>
            <img src={pp || "/pp.jpg"} alt="pp" />
          </LinkQ>
        </div>
        <pre>
          <LinkQ to={`/${username}`}>{username}</LinkQ>
          <LinkConverter text={content} />
        </pre>
        <button onClick={likeSubComment} className={isliked ? "active" : ""}>
          <LikeIconComment isactive={isliked} />
        </button>
      </div>
      <div className="down-side">
        <p className="date">{date}</p>
        <button className="reply" onClick={replyHandle}>
          Reply
        </button>
        <button className="more">
          <MoreIcon2 />
        </button>
      </div>
      {subcommentcount > 0 && (
        <div className="view-replies">
          <div className="up">
            <button onClick={view}>
              <div className="line"></div>
              {subcommentcount - data.length == 0 ? (
                <p>Hide Replies</p>
              ) : (
                <p>View replies ({subcommentcount - data.length})</p>
              )}
            </button>
            {loading && <LoadingBox />}
          </div>
          {data.map((sc) => {
            const { content, pp, username } = sc;
            return (
              <div className="subcomment">
                <img src={pp || "/pp.jpg"} alt="pp" />
                <pre>
                  <LinkQ to={`/${username}`}>{username}</LinkQ>
                  <LinkConverter text={content} />
                </pre>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Data;
