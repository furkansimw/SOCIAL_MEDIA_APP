import React, {
  Dispatch,
  FC,
  SetStateAction,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { IComment, IPost } from "../../interfaces/ISlices";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectProfile } from "../../redux/postsReducer";
import { selectValues } from "../../redux/profileReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { createComment, getComments } from "../../api/posts";
import { DetailIcon } from "../Icons";
import { Link } from "react-router-dom";
import { disableRightClick } from "../Navigation";
import LoadingBox from "../LoadingBox";

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
    comments: { data: comments, hasmore, loading, sending },
    id,
  } = cp;
  // const { username, id, pp } = useSelector(selectValues);

  useEffect(() => {
    if (hasmore && comments.length == 0) dispatch(getComments({ postid: id }));
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
      <Data data={comments} />
      <Bottom ref={commentInputRef} {...{ comment, setComment, sending, id }} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  .info {
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 14px 1rem;
    border-bottom: 1px solid #262626;
    .l {
      display: flex;
      align-items: center;
      .pp {
        img {
          width: 2rem;
          height: 2rem;
          border-radius: 100%;
        }
        margin-right: 14px;
      }
      .username {
        p {
          font-size: 14px;
          font-weight: 600;
          line-height: 18px;
        }
      }
      span {
        margin: 0px 6px;
      }
      button {
        background-color: transparent;
        border: none;
        outline: none;
        font-size: 14px;
        font-weight: 600;
        color: #0095f6;
        &:hover {
          color: #fafafa;
        }
      }
    }
    .d {
      width: 24px;
      height: 24px;
      background-color: transparent;
      border: none;
      outline: none;
    }
    a:hover {
      opacity: 0.6;
    }
    .d:hover {
      opacity: 0.6;
    }
  }
  .bottom {
    height: 100px;
    position: relative;
    padding: 6px 1rem;
    border-top: 1px solid #262626;
    form {
      display: flex;
      width: 100%;
      input {
        background-color: transparent;
        outline: none;
        width: 100%;
        border: none;
        font-size: 14px;
        line-height: 18px;
        &::placeholder {
          color: #a8a8a8;
        }
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
          opacity: 0.9;
        }
      }
    }
    .loading-box {
      position: absolute;
      left: 0px;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      top: 0px;
    }
  }
`;

const Info = ({
  to,
  username,
  isfollowing,
  pp,
}: {
  to: string;
  username: string;
  isfollowing: boolean;
  pp: string | null;
}) => (
  <div className="info">
    <div className="l">
      <Link className="pp" to={to} replace>
        <img onContextMenu={disableRightClick} src={pp || "/pp.jpg"} alt="pp" />
      </Link>
      <Link className="username" to={to} replace>
        <p>{username}</p>
      </Link>
      <span>•</span>
      {!isfollowing && <button>Follow</button>}
    </div>
    <button className="d">
      <DetailIcon />
    </button>
  </div>
);

const Data = ({ data }: { data: IComment[] }) => (
  <div>
    <h1>Data</h1>
  </div>
);

type BottomProps = {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  sending: boolean;
  id: string;
};
const Bottom = forwardRef<HTMLInputElement, BottomProps>(
  ({ comment, setComment, sending, id }, inputRef) => {
    const dispatch = useDispatch<AppDispatch>();
    const myvalues = useSelector(selectValues);
    return (
      <div className="bottom">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (comment.trim().length === 0) return;
            const content = comment.replace(/\s+/g, " ");
            dispatch(createComment({ content, postid: id, ...myvalues }));
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
          <button disabled={comment.length == 0} type="submit">
            Post
          </button>
        </form>
        {sending && <LoadingBox />}
      </div>
    );
  }
);

export default PostPopupComments;
