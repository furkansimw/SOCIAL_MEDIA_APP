import React, { memo, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { ArrowLeft, ArrowRight } from "./Icons";
import { shallowEqual, useSelector } from "react-redux";
import { selectpostsForBack } from "../redux/postsReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

const PostPopupNav = () => {
  const posts = useSelector(selectpostsForBack, shallowEqual);
  const currentPostId = window.location.pathname.split("/")[2];

  const [index, setIndex] = useState(
    posts.findIndex((p) => p.id == currentPostId)
  );

  const dispatch = useDispatch<AppDispatch>();

  const next = () => {
    window.history.pushState(null, "", `/p/${posts[index + 1].id}`);
    dispatch(setCurrentPostId(currentPostId));
  };

  const back = () => {
    window.history.pushState(null, "", `/p/${posts[index - 1].id}`);
    dispatch(setCurrentPostId(currentPostId));
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
