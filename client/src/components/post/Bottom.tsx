import styled from "styled-components";
import LoadingBox from "../LoadingBox";
import { createComment } from "../../api/posts";
import { useDispatch, useSelector } from "react-redux";
import { selectValues } from "../../redux/profileReducer";
import { AppDispatch } from "../../redux/store";
import { forwardRef } from "react";
import { Dispatch, SetStateAction } from "react";

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
      <BottomContainer>
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
      </BottomContainer>
    );
  }
);

const BottomContainer = styled.div`
  height: 130px;
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
        opacity: 0.6;
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
`;

export default Bottom;
