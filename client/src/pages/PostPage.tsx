import { shallowEqual, useSelector } from "react-redux";
import {
  selectCurrentPostP,
  setBack,
  setCurrentPostId,
} from "../redux/postsReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getPost } from "../api/posts";
import NotFound from "../components/profile/NotFound";
import PostPopupImages from "../components/post/postpopup/PostPopupImages";
import PostPopupComments from "../components/post/postpopup/PostPopupComments";
import styled from "styled-components";

const PostPage = () => {
  const postid = window.location.pathname.split("/")[2];
  const dispatch = useDispatch<AppDispatch>();
  const currentPost = useSelector(
    (s: RootState) => selectCurrentPostP(s, postid),
    shallowEqual
  );

  useEffect(() => {
    if (currentPost == undefined) {
      dispatch(setCurrentPostId(postid));
      dispatch(getPost(postid));
      dispatch(setBack(null));
    }
  }, []);

  if (!currentPost) return <></>;

  if (currentPost.exists == "not-found") return <NotFound />;

  if (currentPost.exists == "loading") return <></>;

  return (
    <Contianer>
      <div className="xd">
        <PostPopupImages />
        <PostPopupComments />
      </div>
    </Contianer>
  );
};

const Contianer = styled.div`
  height: 100vh;
  padding: 6rem 2rem 0px !important;
  @media screen and (max-width: 1340px) {
    .xd {
      max-width: calc(100% - 4rem) !important;
      min-width: 0px;
    }
  }
  .cvr {
    height: 100%;
    max-width: 800px;
    width: 100%;
    min-width: 500px;
    position: relative;

    .layer {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 10;
    }
    .cover {
      width: 100%;
      object-fit: cover;
      height: 100%;
    }
  }
  .xd {
    height: 100%;
    border-radius: 4px;
    max-width: 1100px;
    width: 100%;
    max-height: 600px;
    z-index: 150;
    background-color: #000;
    display: flex;
    transform: scale(1);
    border: 1px solid #464646;
    @keyframes sc {
      from {
        transform: scale(1.2);
      }
      to {
        transform: scale(1);
      }
    }
    .like-a {
      position: absolute;
      left: calc(50% - 64px);
      z-index: 10;
      top: calc(50% - 64px);
      background-image: url("/bg.png");
      background-repeat: no-repeat;
      background-position: 0 0;
      height: 128px;
      width: 128px;
      opacity: 0;
      &.a {
        @keyframes scsx {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          15% {
            opacity: 0.9;
            transform: scale(1.2);
          }
          30% {
            transform: scale(0.95);
          }
          45%,
          80% {
            opacity: 0.9;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0);
          }
        }
        animation: 1s scsx ease-in-out;
      }
    }

    .swiper {
      height: 100%;
    }
    .images {
      height: 100%;
      width: 700px;
      position: relative;
      img {
        width: 100%;
        object-fit: cover;
        height: 100%;
        max-width: 800px;
      }
      .layer {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
      }
    }
  }
  .c {
    height: 100%;
  }
`;

export default PostPage;
