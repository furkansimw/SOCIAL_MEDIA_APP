import React, { useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectPostPopupActive,
  toggleSetLoginPopupActive,
} from "../redux/profileReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import Login from "../pages/Login";

const LoginPopup = () => {
  const postPopupActive = useSelector(selectPostPopupActive);
  const dispatch = useDispatch<AppDispatch>();
  const close = () => dispatch(toggleSetLoginPopupActive());
  const ref = useRef<HTMLDivElement>(null);
  if (!postPopupActive) return null;
  return (
    <>
      <Bg className={postPopupActive ? "active" : ""} onClick={close} />
      <Container
        ref={ref}
        style={{
          top: `calc(50% - 200px)`,
        }}
        className={postPopupActive ? "active" : ""}
      >
        <Login />
      </Container>
    </>
  );
};

const Bg = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 70;
  left: 0px;
  top: 0px;
  transition: 0.3s ease-in-out all;
  opacity: 0;
  pointer-events: none;
  &.active {
    pointer-events: all;
    opacity: 1;
  }
`;

const Container = styled.div`
  position: fixed;
  z-index: 300;
  top: -400px;
  min-height: 400px;
  top: calc(50% - 200px);
  min-width: 400px;
  border-radius: 8px;
  left: calc(50% - 200px);
  overflow: hidden;
  background-color: #000;
  transition: 0.3s ease-in-out all;
  transform: scale(1);
  &.active {
    @keyframes sca {
      0% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
    animation: sca 0.1s ease-in-out;
  }
`;

export default LoginPopup;
