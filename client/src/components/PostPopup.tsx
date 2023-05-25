import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch } from "../redux/store";
import { setBack } from "../redux/postsSlice";

const PostPopup = () => {
  const dispatch = useDispatch<AppDispatch>();

  const close = () => {
    window.history.back();
    dispatch(setBack(null));
  };

  useEffect(() => {
    const worker = (e: PopStateEvent) => dispatch(setBack(null));
    window.addEventListener("popstate", worker);
  }, []);

  return (
    <>
      <Bg onClick={close} />
      <Container>
        <h1>PostPopup</h1>
      </Container>
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
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  left: 50%;
  top: 50%;
  max-width: 1100px;
  height: 100%;
  max-height: 700px;
  transform: translate(-50%, -50%);
  position: fixed;
  z-index: 150;
  margin: 2rem;
  background-color: #000;
`;

export default PostPopup;
