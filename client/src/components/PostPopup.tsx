import { useEffect } from "react";
import { shallowEqual, useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch } from "../redux/store";
import { selectBack, setBack, setCurrentPostId } from "../redux/postsReducer";
import PostPopupComments from "./post/postpopup/PostPopupComments";
import PostPopupImages from "./PostPopupImages";
import PostPopupNav from "./PostPopupNav";
import { useSelector } from "react-redux";

const PostPopup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const back = useSelector(selectBack, shallowEqual);
  const close = () => {
    window.history.replaceState(null, "", `/${back == "home" ? "" : back}`);
    dispatch(setBack(null));
    dispatch(setCurrentPostId(null));
  };

  const worker2 = (e: KeyboardEvent) => {
    if (e.key == "Escape") close();
  };

  useEffect(() => {
    const worker = () => dispatch(setBack(null));
    window.addEventListener("popstate", worker);
    window.addEventListener("keydown", worker2);
    return () => {
      window.removeEventListener("popstate", worker);
      window.removeEventListener("keydown", worker2);
    };
  }, []);

  return (
    <>
      <Bg onClick={close} />
      <Container>
        <PostPopupImages />
        <PostPopupComments />
      </Container>
      {back != "home" && <PostPopupNav />}
    </>
  );
};

const Bg = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 0px;
  position: fixed;
  z-index: 120;
`;

const Container = styled.div`
  border-radius: 4px;
  @media screen and (max-width: 1328px) {
    left: 4rem !important;
    width: calc(100% - 8rem) !important;
    .cvr,
    .images {
      width: 100%;
      min-width: 500px;
      object-fit: cover;
    }
  }

  @media screen and (max-height: 864px) {
    top: 2rem !important;
    height: calc(100% - 4rem) !important;
  }

  background-color: rgba(0, 0, 0, 0.6);
  left: calc(50% - 600px);
  top: calc(50% - 400px);
  max-width: 1200px;
  width: 100%;
  height: 100%;
  max-height: 800px;
  position: fixed;
  z-index: 150;
  background-color: #000;
  display: flex;
  transform: scale(1.2);
  @keyframes sc {
    from {
      transform: scale(1.2);
    }
    to {
      transform: scale(1);
    }
  }
  animation: sc 0.1s ease-in-out forwards;
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
  .swiper {
    height: 100%;
  }
  .images {
    height: 100%;
    width: 800px;
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
`;

export default PostPopup;
