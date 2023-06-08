import styled from "styled-components";
import LoadingBox from "../../LoadingBox";
import { createAction, createComment } from "../../../api/posts";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectValues } from "../../../redux/profileReducer";
import { AppDispatch } from "../../../redux/store";
import { forwardRef, useMemo, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { selectCurrentPost } from "../../../redux/postsReducer";
import { CommentIcon, LikeIcon, SaveIcon, ShareIcon } from "../../Icons";
import LinkQ from "../LinkQ";
import Likes from "./Likes";

type BottomProps = {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  isRepliying: {
    commentid: string;
    username: string;
    offset: number;
  } | null;
};

export const dateCalc = (d: string) => {
  const now = new Date(Date.now());
  const date = new Date(d);

  const diffM = parseInt(
    ((now.getTime() - date.getTime()) / 1000 / 60).toString()
  );

  if (diffM < 1) return `now`;

  if (diffM < 60) return `${diffM}m ago`;

  const diffH = parseInt((diffM / 60).toString());

  if (diffH < 24) return `${diffH}h ago`;

  const sameYear = now.getFullYear() == date.getFullYear();
  const month = [
    `Jan`,
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][date.getMonth()];

  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  if (diffH / 24 < 7) return `${parseInt((diffH / 24).toString())}d ago`;
  if (sameYear) return `${day} ${month}`;
  return `${day} ${month} ${date.getFullYear()}`;
};

const Bottom = forwardRef<HTMLInputElement, BottomProps>(
  ({ comment, setComment, isRepliying }, inputRef) => {
    const dispatch = useDispatch<AppDispatch>();
    const myvalues = useSelector(selectValues, shallowEqual);

    const postid = window.location.pathname.split("/")[2];
    const {
      comments: { sending },
      isliked,
      id,
      likecount,
      issaved,
      created,
      owner: postowner,
    } = useSelector(selectCurrentPost, shallowEqual)!;

    const date = useMemo(() => dateCalc(created), []);

    const like = () =>
      dispatch(createAction({ postid, a: !isliked, t: "like", postowner }));

    const save = () =>
      dispatch(createAction({ postid, a: !issaved, t: "save", postowner }));

    const [likesPopup, setLikesPopup] = useState(false);
    const quit = () => setLikesPopup(false);
    const viewLikes = () => setLikesPopup(true);
    return (
      <BottomContainer>
        <div className="icons">
          <div className="l">
            <button
              className={`like ${isliked ? "active" : ``}`}
              onClick={like}
            >
              <LikeIcon isactive={isliked} />
            </button>
            <button
              onClick={() => (inputRef as any).current.focus()}
              className="comment"
            >
              <CommentIcon />
            </button>
            {likesPopup && <Likes type="post" quit={quit} postid={id} />}
            <button>
              <ShareIcon />
            </button>
          </div>
          <button onClick={save} className={`save ${issaved ? "active" : ``}`}>
            <SaveIcon isactive={issaved} />
          </button>
        </div>
        <div className="detail">
          <p onClick={viewLikes} className="likecount">
            {likecount.toLocaleString()} likes
          </p>
          <p className="date">{date}</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (comment.trim().length === 0) return;
            const content = comment.replace(/\s+/g, " ").trim();
            dispatch(
              createComment({
                content,
                postid,
                ...myvalues,
                commentid: isRepliying?.commentid,
                postowner,
              })
            );
          }}
        >
          <input
            type="text"
            name="comment"
            id="comment"
            placeholder="Add a comment..."
            ref={inputRef}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            maxLength={200}
          />
          {isRepliying && (
            <LinkQ to={`/${isRepliying.username}`}>
              @{isRepliying.username}
            </LinkQ>
          )}
          <button
            disabled={
              comment.trim().length == 0 ||
              (isRepliying
                ? isRepliying.username.length + 2 > comment.trim().length
                : false)
            }
            type="submit"
          >
            Post
          </button>
        </form>
        {sending && <LoadingBox />}
      </BottomContainer>
    );
  }
);

const BottomContainer = styled.div`
  position: relative;
  border-top: 1px solid #262626;
  .icons {
    display: flex;
    padding: 6px 1rem 6px;

    button {
      &:first-child {
        padding-left: 0px;
      }
      &:hover {
        &.active {
          opacity: 1 !important;
        }
        opacity: 0.7;
      }
      background-color: transparent;
      padding: 6px;
      position: relative;

      &.like {
        svg {
          transform: scale(1);
        }
        &.active {
          svg {
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
      &.save {
        padding-right: 0px;
      }
    }
    .l {
      display: flex;
      width: 100%;
    }
  }
  .detail {
    padding: 0px 1rem;
    margin-bottom: 1rem;
    p {
      margin-bottom: 6px;
      font-size: 14px;
      line-height: 18px;
      font-weight: 500;
      cursor: pointer;
      &.date {
        user-select: none;
        cursor: default;
        font-size: 12px;
        line-height: 14px;
        color: #a8a8a8;
        font-weight: 400;
      }
      &.likecount {
        font-weight: 600;
      }
    }
  }
  form {
    display: flex;
    width: 100%;
    height: 40px;
    border-top: 1px solid #262626;
    padding: 0px 1rem;
    position: relative;
    input {
      background-color: transparent;
      outline: none;
      width: 100%;
      height: 40px;
      border: none;
      line-height: 20px;
      padding-right: 10px;
      font-weight: 400;
      height: 40px;
      &::placeholder {
        color: #a8a8a8;
      }
    }
    a {
      background-color: #000;
      position: absolute;
      font-weight: 600;
      font-size: 14px;
      top: 10px;
      height: 18px;
      left: 10.5px;
      padding-right: 4px;
    }
    button {
      color: #0095f6;
      background-color: transparent;
      border: none;
      font-size: 14px;
      font-weight: 600;
      outline: none;
      &:disabled {
        cursor: default;
        opacity: 0.6;
      }
      margin-right: 10px;
    }
  }
  .loading-box {
    position: absolute;
    left: 0px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0px;
  }
`;

export default Bottom;
