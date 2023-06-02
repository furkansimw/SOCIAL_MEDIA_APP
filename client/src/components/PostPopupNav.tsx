import React, { memo, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { ArrowLeft, ArrowRight } from "./Icons";
import { shallowEqual, useSelector } from "react-redux";
import {
  selectBack,
  selectProfile,
  selectpostsForBack,
  setCurrentPostId,
} from "../redux/postsReducer";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getProfilePosts } from "../api/profile";

const PostPopupNav = () => {
  const posts = useSelector(selectpostsForBack, shallowEqual);

  const [index, setIndex] = useState(
    posts.findIndex((p) => p.id == window.location.pathname.split("/")[2])
  );

  const dispatch = useDispatch<AppDispatch>();

  const next = () => {
    setIndex(index + 1);
    window.history.pushState(null, "", `/p/${posts[index + 1].id}`);
    dispatch(setCurrentPostId(window.location.pathname.split("/")[2]));
  };

  const username = useSelector(selectBack, shallowEqual)!;

  const { postsState } = useSelector(
    (s: RootState) => selectProfile(s, username),
    shallowEqual
  );

  useEffect(() => {
    if (!postsState) return;
    const { hasmore, loading } = postsState;
    if (index == posts.length - 1 && hasmore && !loading) {
      const username = window.location.pathname.split("/")[2];
      const { created: date, id } = posts[posts.length - 1];
      dispatch(getProfilePosts({ username, date, id }));
    }
  }, [index]);

  const back = () => {
    setIndex(index - 1);
    window.history.pushState(null, "", `/p/${posts[index - 1].id}`);
    dispatch(setCurrentPostId(window.location.pathname.split("/")[2]));
  };
  return (
    <Container>
      {index > 0 && (
        <button className="leftnav" onClick={back}>
          <ArrowLeft />
        </button>
      )}
      {index < posts.length - 1 && (
        <button className="rightnav" onClick={next}>
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
