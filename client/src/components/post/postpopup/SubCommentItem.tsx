import { useMemo } from "react";
import { ISubComment } from "../../../interfaces/ISlices";
import styled from "styled-components";
import { LikeIconComment, MoreIcon2 } from "../../Icons";
import LinkConverter from "../LinkConverter";
import LinkQ from "../LinkQ";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { likeComment } from "../../../api/posts";
import { dateCalc } from "./Bottom";

const SubCommentItem = ({
  subcomment,
  commentid,
  reply,
}: {
  subcomment: ISubComment;
  commentid: string;
  reply: () => void;
}) => {
  const {
    isliked,
    pp,
    username,
    content,
    created,
    likecount,
    id: subcommentid,
  } = subcomment;
  const dispatch = useDispatch<AppDispatch>();
  const postid = window.location.pathname.split("/")[2];

  const likeSubComment = () =>
    dispatch(likeComment({ a: !isliked, commentid, postid, subcommentid }));

  const date = useMemo(() => dateCalc(created), []);

  const lastActive = useMemo(
    () =>
      (new Date(Date.now()).getTime() - new Date(created).getTime()) / 1000 < 1,
    []
  );

  const viewLikes = () => {};

  return (
    <Container className={lastActive ? "lastactive" : ""}>
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
          {likecount > 0 && (
            <button onClick={viewLikes} className="likes">
              {likecount} like{likecount > 1 && `s`}
            </button>
          )}
          <p className="date">{date}</p>
          <button className="reply" onClick={reply}>
            Reply
          </button>
          <button className="morex">
            <MoreIcon2 />
          </button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.li`
  display: flex;
  align-items: start;
  padding: 8px 4.5px;
  width: 100%;
  border-radius: 6px;
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
  &:hover .morex {
    display: block !important;
  }
  .left {
    width: 2rem;
    margin-right: 9px;
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
    padding: 0px 4.5px;
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
      .likes {
        font-size: 12px;
        color: #a8a8a8;
        margin-right: 12px;
        font-weight: 600;
      }
      .date {
        font-size: 12px;
        color: #a8a8a8;
        margin-right: 12px;
        font-weight: 600;
      }
      .reply {
        font-size: 12px;
        margin-right: 12px;
        color: #a8a8a8;
      }
      .morex {
        display: none;
      }
    }
  }
`;

export default SubCommentItem;
