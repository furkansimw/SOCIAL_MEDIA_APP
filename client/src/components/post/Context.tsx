import { FC } from "react";
import styled from "styled-components";
import { Bg } from "../PostPopup";
import LinkQ from "./LinkQ";
import { IPost } from "../../interfaces/ISlices";
import { shallowEqual, useSelector } from "react-redux";
import { selectValues } from "../../redux/profileReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { removePost } from "../../api/posts";
import { selectBack } from "../../redux/postsReducer";

type Props = {
  post: IPost;
  close: () => void;
};

const Context: FC<Props> = ({ post, close }) => {
  const { id } = useSelector(selectValues, shallowEqual);
  const mypost = post.owner == id;
  const dispatch = useDispatch<AppDispatch>();
  const remove = () => dispatch(removePost(post.id));
  const back = useSelector(selectBack, shallowEqual);
  return (
    <>
      <Bg onClick={close} />
      <Container className={mypost ? "my" : ""}>
        {mypost && (
          <button onClick={remove} className="r">
            Remove
          </button>
        )}
        {back != null && <LinkQ to={`/p/${post.id}`}>Go to post</LinkQ>}
        <button
          onClick={() =>
            navigator.clipboard
              .writeText(window.location.origin + "/p/" + post.id)
              .then(close)
          }
        >
          Copy link
        </button>
        <button onClick={close}>Cancel</button>
      </Container>
    </>
  );
};

const Container = styled.div`
  @keyframes identifierx {
    0% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  animation: identifierx 0.1s ease-in-out all;
  width: 400px;
  background-color: #262626;
  border-radius: 12px;
  border-radius: 12px;
  position: fixed;
  left: calc(50% - 200px);
  top: calc(50% - 75px);
  z-index: 130;
  button,
  a,
  button {
    &.r {
      color: #ed4956;
      font-weight: 600 !important;
    }
    &:first-child {
      border-top: none;
    }
    border-top: 1px solid #363636;
    width: 100%;
    height: 49px;
    font-size: 14px;
    color: #fafafa;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Context;
