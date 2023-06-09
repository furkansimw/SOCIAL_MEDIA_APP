import React, { FC } from "react";
import { styled } from "styled-components";
import { CloseIcon } from "../Icons";

type Props = {
  title: string;
  close: () => void;
};

const MessagesPopup: FC<Props> = ({ title, close }) => {
  return (
    <>
      <Bg onClick={close} />
      <Container>
        <div className="header">
          <p>{title}</p>
          <button onClick={close}>
            <CloseIcon />
          </button>
        </div>
      </Container>
    </>
  );
};

const Bg = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  display: flex;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 500;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  left: 0px;
  top: 0px;
  z-index: 600;
  background-color: #262626;
  border-radius: 12px;
  max-width: 600px;
  max-height: 600px;
  height: 100%;
  width: 100%;
  left: calc(50% - 300px);
  top: calc(50% - 300px);
  @keyframes scale {
    0% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  animation: 0.1s scale ease-in-out;
  @media screen and (max-width: 664px) {
    left: 2rem;
    width: calc(100% - 4rem);
  }
  @media screen and (max-height: 664px) {
    top: 2rem;
    height: calc(100% - 4rem);
  }
  .header {
    width: 100%;
    height: 56px;
    border-bottom: 1px solid #363636;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      line-height: 18px;
      font-weight: 700;
    }
    button {
      width: 34px;
      height: 34px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
`;

export default MessagesPopup;
