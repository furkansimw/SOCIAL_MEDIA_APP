import { FC } from "react";
import { IPost } from "../../interfaces/ISlices";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setBack, setCurrentPostId } from "../../redux/postsReducer";
import { MoreIconImages } from "../Icons";

type props = {
  post: IPost;
  back: string;
};

const PostMini: FC<props> = ({ post, back }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { cover, id, likecount, commentcount, more } = post;

  const tap = () => {
    window.history.pushState(null, "", `/p/${id}`);
    dispatch(setCurrentPostId(id));
    dispatch(setBack(back));
  };

  return (
    <Container onClick={tap}>
      <Link to={`/p/${id}`} onClick={(e) => e.preventDefault()}>
        <img src={cover} alt={`cover ${id}`} />
        <div className="text">
          {likecount > 0 && (
            <div className="like">
              <div className="icon"></div>
              <p>{likecount.toLocaleString()}</p>
            </div>
          )}
          {commentcount > 0 && (
            <div className="comment">
              <div className="icon"></div>
              <p>{commentcount.toLocaleString()}</p>
            </div>
          )}
        </div>
        {more && <MoreIconImages />}
        <div className="layer"></div>
      </Link>
    </Container>
  );
};

const Container = styled.li`
  height: 100px;
  max-width: 300px;
  max-height: 300px;
  width: 100%;
  object-fit: cover;
  height: 100%;
  aspect-ratio: 1;
  cursor: pointer;
  position: relative;
  margin: -3px 0px;
  .moreimagesicon {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 10;
    width: 1rem;
    height: 1rem;
  }
  .layer {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
  }
  &:hover {
    .layer {
      background-color: rgba(0, 0, 0, 0.3);
    }
    .text {
      opacity: 1;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .text {
    z-index: 10;
    opacity: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    display: flex;
    justify-content: center;
    div {
      display: flex;
      align-items: center;
      p {
        font-weight: 600;
      }
    }
    .like {
      margin-right: 2rem;
      .icon {
        background-repeat: no-repeat;
        background-position: -340px -333px;
        height: 19px;
        width: 19px;
        background-image: url("/bg.png");
        margin-right: 6px;
      }
    }
    .comment {
      .icon {
        background-image: url("/bg.png");
        background-repeat: no-repeat;
        background-position: -382px -333px;
        height: 19px;
        margin-right: 6px;
        width: 19px;
      }
    }
  }
`;

export default PostMini;
