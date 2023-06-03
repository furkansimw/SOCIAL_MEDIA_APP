import { useMemo, useState } from "react";
import { getComments, likeComment } from "../../../api/posts";
import { toggleSubCommetsT } from "../../../redux/postsReducer";
import { LikeIconComment, MoreIcon2 } from "../../Icons";
import LoadingBox from "../../LoadingBox";
import LinkConverter from "../LinkConverter";
import LinkQ from "../LinkQ";
import SubCommentItem from "./SubCommentItem";
import { useDispatch } from "react-redux";
import { IComment } from "../../../interfaces/ISlices";
import { AppDispatch } from "../../../redux/store";
import { dateCalc } from "./Bottom";
import styled from "styled-components";
import Likes from "./Likes";

type Props = {
  comment: IComment;
  reply: (commentid: string, username: string) => void;
};

const CommentItem = ({ comment, reply }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    id: commentid,
    username,
    pp,
    likecount,
    subcommentcount,
    content,
    isliked,
    created,
    subcomments: { data, hasmore, t, loading },
  } = comment;
  const postid = window.location.pathname.split("/")[2];
  const likeCommentT = () =>
    dispatch(likeComment({ a: !isliked, commentid, postid }));

  const date = useMemo(() => dateCalc(created), []);

  const replyHandle = () => reply(commentid, username);

  const view = () => {
    const date = data[data.length - 1]?.created,
      id = data[data.length - 1]?.id;
    if (hasmore && subcommentcount > 0)
      dispatch(getComments({ postid, commentid, date, id }));
    else dispatch(toggleSubCommetsT({ postid, commentid, t: !t }));
  };
  const lastActive = useMemo(
    () =>
      (new Date(Date.now()).getTime() - new Date(created).getTime()) / 1000 < 1,
    []
  );

  const like = () => {
    if (isliked) return;
    dispatch(likeComment({ a: true, commentid, postid }));
  };

  const [likesPopup, setLikesPopup] = useState(false);
  const viewLikes = () => setLikesPopup(true);
  const quit = () => setLikesPopup(false);

  return (
    <Container className={lastActive ? "lastactive" : ""}>
      <div className="left" onDoubleClick={like}>
        <div className="pp">
          <LinkQ className="u" to={`/${username}`}>
            <img src={pp || "/pp.jpg"} alt="pp" />
          </LinkQ>
        </div>
      </div>
      <div className="right">
        <div className="upside" onDoubleClick={like}>
          <pre>
            <LinkQ className="username" to={`/${username}`}>
              {username}
            </LinkQ>
            <LinkConverter text={content} />
          </pre>
          <button onClick={likeCommentT} className={isliked ? "active" : ""}>
            <LikeIconComment isactive={isliked} />
          </button>
          {likesPopup && (
            <Likes
              postid={postid}
              type="comment"
              commentid={commentid}
              quit={quit}
            />
          )}
        </div>
        <div className="down-side" onDoubleClick={like}>
          {likecount > 0 && (
            <button onClick={viewLikes} className="likes">
              {likecount} like{likecount > 1 && `s`}
            </button>
          )}
          <p className="date">{date}</p>
          <button className="reply" onClick={replyHandle}>
            Reply
          </button>
          <button className="more">
            <MoreIcon2 />
          </button>
        </div>
        {subcommentcount > 0 && (
          <ul className="view-replies">
            <div className="up">
              <button onClick={view}>
                <div className="line"></div>
                {t && !hasmore ? (
                  <p>Hide Replies</p>
                ) : (
                  <p>
                    View replies (
                    {hasmore ? subcommentcount - data.length : subcommentcount})
                  </p>
                )}
              </button>
              {loading && <LoadingBox />}
            </div>
            {(hasmore ? data.length > 0 : t) &&
              data.map((sc) => (
                <SubCommentItem
                  subcomment={sc}
                  commentid={commentid}
                  reply={() => reply(comment.id, sc.username)}
                />
              ))}
          </ul>
        )}
      </div>
    </Container>
  );
};

const Container = styled.li`
  display: flex;
  align-items: start;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  padding: 8px 1rem;
  &.lastactive {
    @keyframes l {
      0% {
        background-color: transparent;
      }
      25% {
        background-color: transparent;
      }
      50% {
        background-color: rgb(50, 50, 50);
      }
      100% {
        background-color: transparent;
      }
    }
    animation: 3s ease l;
  }
  &:hover .more {
    display: block !important;
  }
  .left {
    width: 2rem;
    margin-right: 18px;
    min-width: 2rem;
    height: 2rem;
    width: 2rem;
    min-height: 2rem;
    .pp {
      a {
        width: 2rem;
        height: 2rem;
        img {
          border-radius: 100%;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
  .right {
    width: 100%;
    button {
      background-color: transparent;
    }
    .upside {
      width: 100%;
      display: flex;
      align-items: start;
      pre {
        word-wrap: break-word;
        max-width: 288px;
        width: 100%;
        white-space: pre-wrap;
        font-size: 14px;
        .username {
          font-weight: 600;
          margin-right: 4px;
        }
      }
      button {
        margin-left: 18px;
      }
    }
    .down-side {
      display: flex;
      align-items: center;
      height: 18px;
      margin: 8px 0px 4px;
      .likes {
        font-size: 12px;
        color: #a8a8a8;
        margin-right: 12px;
        font-weight: 600;
      }
      .date {
        user-select: none;
        font-size: 12px;
        font-weight: 600;
        color: #a8a8a8;
        margin-right: 12px;
      }
      .reply {
        font-size: 12px;
        margin-right: 12px;
        color: #a8a8a8;
      }
      .more {
        display: none;
      }
    }
    .view-replies {
      margin-top: 1rem;
      .up {
        height: 18px;
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        .loading-box {
          width: 20px;
          height: 20px;
        }
        button {
          display: flex;
          align-items: center;
          margin-right: 12px;
          .line {
            margin-right: 1rem;
            width: 24px;
            height: 1px;
            background-color: #a8a8a8;
          }
          color: #a8a8a8;
          font-size: 12px;
        }
      }
    }
  }
`;

export default CommentItem;
