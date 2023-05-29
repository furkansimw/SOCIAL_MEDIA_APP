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
    id: subcommentid,
  } = subcomment;
  const dispatch = useDispatch<AppDispatch>();
  const postid = window.location.pathname.split("/")[2];

  const likeSubComment = () =>
    dispatch(likeComment({ a: !isliked, commentid, postid, subcommentid }));

  const date = useMemo(() => dateCalc(created), []);

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
  margin-top: 1rem;
  width: 100%;
  &:hover .morex {
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
      .morex {
        display: none;
      }
    }
  }
`;

export default SubCommentItem;
