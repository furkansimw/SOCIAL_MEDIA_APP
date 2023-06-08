import { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { ArrowLeft, ArrowRight } from "./Icons";
import { shallowEqual, useSelector } from "react-redux";
import {
  selectBack,
  selectMetaData,
  selectProfile,
  selectpostsForBack,
  setCurrentPostId,
} from "../redux/postsReducer";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getProfilePosts } from "../api/profile";
import { getPosts } from "../api/posts";

const PostPopupNav = () => {
  const posts = useSelector(selectpostsForBack, shallowEqual);

  const [index, setIndex] = useState(
    posts.findIndex((p) => p.id == window.location.pathname.split("/")[2])
  );

  const dispatch = useDispatch<AppDispatch>();

  const nextF = () => {
    if (index == posts.length - 1) return;
    setIndex(index + 1);
    window.history.replaceState(null, "", `/p/${posts[index + 1].id}`);
    dispatch(setCurrentPostId(window.location.pathname.split("/")[2]));
  };

  const back = useSelector(selectBack, shallowEqual);

  const username = back ? back : window.location.pathname.split("/")[1];

  const a = useSelector(
    (s: RootState) =>
      ["explore", "home"].includes(back!)
        ? selectMetaData(s)
        : selectProfile(s, username),
    shallowEqual
  );

  useEffect(() => {
    if (back == "explore") {
      const {
        hasmore: { [back]: hasmore },
        loading: { [back]: loading },
      } = a as any;
      if (index == posts.length - 1 && hasmore && !loading) {
        const { created: date, id } = posts[posts.length - 1];
        dispatch(getPosts({ explore: true, date, id }));
      }
    } else {
      const { hasmore, loading } = a as any;
      if (index == posts.length - 1 && hasmore && !loading) {
        const username = window.location.pathname.split("/")[2];
        const { created: date, id } = posts[posts.length - 1];
        dispatch(getProfilePosts({ username, date, id }));
      }
    }
  }, [index]);

  useEffect(() => {
    const worker = (e: KeyboardEvent) => {
      if (e.key == "ArrowLeft") backF();
      else if (e.key == "ArrowRight") nextF();
    };
    window.addEventListener("keydown", worker);
    return () => {
      window.removeEventListener("keydown", worker);
    };
  }, [index]);

  const backF = () => {
    if (index == 0) return;

    setIndex(index - 1);
    window.history.replaceState(null, "", `/p/${posts[index - 1].id}`);
    dispatch(setCurrentPostId(window.location.pathname.split("/")[2]));
  };

  return (
    <Container>
      {index > 0 && (
        <button className="leftnav" onClick={backF}>
          <ArrowLeft />
        </button>
      )}
      {index < posts.length - 1 && (
        <button className="rightnav" onClick={nextF}>
          <ArrowRight />
        </button>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: calc(50% - 1rem);
  z-index: 121;
  width: 100%;
  height: 2rem;
  padding: 0px 1rem;
  pointer-events: none;
  button {
    pointer-events: all;
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    &:hover {
      opacity: 0.8;
    }
    background-color: #fff;
    &.leftnav {
      left: 1rem;
    }
    &.rightnav {
      right: 1rem;
    }
  }
  svg {
    transform: rotate(90deg);
    width: 1rem;
    height: 1rem;
  }
  .leftnav {
    transform: rotate(-180deg);
  }
`;

export default memo(PostPopupNav);
