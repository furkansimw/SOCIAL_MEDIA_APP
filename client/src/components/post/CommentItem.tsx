import { useMemo } from "react";
import { getComments, likeComment } from "../../api/posts";
import { toggleSubCommetsT } from "../../redux/postsReducer";
import { LikeIconComment, MoreIcon2 } from "../Icons";
import LoadingBox from "../LoadingBox";
import LinkConverter from "./LinkConverter";
import LinkQ from "./LinkQ";
import SubCommentItem from "./SubCommentItem";
import { useDispatch } from "react-redux";
import { IComment } from "../../interfaces/ISlices";
import { AppDispatch } from "../../redux/store";
import { dateCalc } from "./Bottom";
import styled from "styled-components";

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
    const obj = {
      postid,
      commentid,
      offset: data.length,
      sd: data[0]?.created,
    };
    if (hasmore) dispatch(getComments(obj));
    else dispatch(toggleSubCommetsT({ postid, commentid, t: !t }));
  };

  return (
    <Container>
      <div className="left">
        <div className="pp">
          <LinkQ to={`/${username}`}>
            <img src={pp || "/pp.jpg"} alt="pp" />
          </LinkQ>
        </div>
      </div>
      <div className="right">
        <div className="upside">
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
          <ul className="view-replies">
            <div className="up">
              <button onClick={view}>
                <div className="line"></div>
                {t ? (
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
            {(hasmore || t) &&
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
  margin-bottom: 1rem;
  width: 100%;
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
        a {
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
      .date {
        font-size: 12px;
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
      .up {
        margin: 1rem 0px 0px;
        height: 18px;
        display: flex;
        align-items: center;
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
