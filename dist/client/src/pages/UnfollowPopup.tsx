import { FC } from "react";
import styled from "styled-components";
import { disableRightClick } from "../components/navigation/Navigation";

type Props = {
  data: { username: string; pp: string | null };
  close: () => void;
  process: () => void;
};

const UnfollowPopup: FC<Props> = ({ data, close, process }) => {
  return (
    <>
      <Bg onClick={close} />
      <Container>
        <img
          onContextMenu={disableRightClick}
          src={data.pp || "/pp.jpg"}
          alt="pp"
        />
        <p className="desc">
          If you change your mind, you'll have to request to follow @
          {data.username} again.
        </p>
        <button
          onClick={() => {
            process();
            close();
          }}
          className="r"
        >
          Unfollow
        </button>
        <button onClick={close}>Cancel</button>
      </Container>
    </>
  );
};

const Bg = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 300vw;
  height: 300vh;
  left: -100vw;
  top: -100vh;
  position: fixed;
  z-index: 520;
`;

const Container = styled.div`
  position: fixed;
  z-index: 700;
  top: calc(50% - 150px);
  left: calc(50% - 200px);
  width: 400px;
  height: 320px;
  border-radius: 12px;
  transition: 0.3s ease-in-out all;
  transform: scale(1);
  @keyframes scalex {
    0% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  animation: 0.1s scalex ease-in-out;
  background-color: #262626;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 90px;
    height: 90px;
    border-radius: 100%;
    margin: 2rem 0px;
  }
  .desc {
    color: #f5f5fe;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    margin-bottom: 2rem;
  }
  button {
    display: block;
    min-height: 49px;
    border-top: 1px solid #363636;
    width: 100%;
    font-size: 14px;
    color: #fafafa;
    &.r {
      color: #ed4956;
      font-weight: 700;
    }
  }
`;

export default UnfollowPopup;
