import React, { FC, useState } from "react";
import { NewMessage } from "../Icons";
import { shallowEqual, useSelector } from "react-redux";
import { selectValues } from "../../redux/profileReducer";
import { styled } from "styled-components";
import MessagesPopup from "./MessagesPopup";

type Props = {
  openRequest: () => void;
  setMessagegroupid: React.Dispatch<React.SetStateAction<string | undefined>>;
  messagegroupid: string | undefined;
  isActive: boolean;
};

const Messages: FC<Props> = ({
  openRequest,
  setMessagegroupid,
  messagegroupid,
  isActive,
}) => {
  const { username } = useSelector(selectValues, shallowEqual);
  const [mp, _mp] = useState(false);
  const newM = () => _mp(true);
  const close = () => _mp(false);

  return (
    <Container className="messages">
      {mp && <MessagesPopup title="New message" close={close} />}
      <div className="up">
        <p className="u">{username}</p>
        <button onClick={newM}>
          <NewMessage />
        </button>
      </div>
      <div className="sc">
        <p className="t">Messages</p>
        <button onClick={openRequest}>Requests</button>
      </div>
      <ul></ul>
    </Container>
  );
};

const Container = styled.div`
  width: 400px;
  min-width: 400px;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  transition: 0.3s ease-in-out all;
  display: flex;
  flex-direction: column;
  .up {
    padding: 36px 24px 12px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      font-size: 20px;
      font-weight: 500;
      line-height: 25px;
    }
  }
  .sc {
    padding: 14px 24px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
      color: #a8a8a8;
      font-size: 14px;
      line-height: 20px;
      font-weight: 500;
      cursor: pointer;
    }
    p {
      font-size: 1rem;
      font-weight: 700;
      line-height: 20px;
    }
  }
  ul {
    height: 100%;
    overflow-y: auto;
    padding: 8px 0px;
    &::-webkit-scrollbar {
      width: 8px;
      background-color: #101010;
    }
    &::-webkit-scrollbar-thumb {
      width: 8px;
      background-color: #363636;
      border-radius: 8px;
      &:active {
        background-color: #464646;
      }
    }
  }
`;

export default Messages;
