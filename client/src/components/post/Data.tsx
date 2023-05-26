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
    margin-bottom: 10px;
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

const CommentItem = ({ comment }: { comment: IComment }) => (
  <div>
    <h1>{comment.content}</h1>
  </div>
);

export default Data;
