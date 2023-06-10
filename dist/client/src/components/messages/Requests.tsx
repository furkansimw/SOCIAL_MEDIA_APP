import React, { FC, useEffect } from "react";
import { styled } from "styled-components";
import { MessageRequestsBack } from "../Icons";

type Props = {
  closeRequest: () => void;
  setMessagegroupid: React.Dispatch<React.SetStateAction<string | undefined>>;
  messagegroupid: string | undefined;
};

const Requests: FC<Props> = ({
  closeRequest,
  messagegroupid,
  setMessagegroupid,
}) => {
  return (
    <Container className="requests">
      <div className="up">
        <button onClick={closeRequest}>
          <MessageRequestsBack />
        </button>
        <h1>Message requests</h1>
      </div>
      <ul>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
        <li>
          <h1>Furkan</h1>
        </li>
      </ul>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .up {
    height: 75px;
    padding: 0px 1rem;
    display: flex;
    align-items: center;
    width: 100%;
    button {
      width: 24px;
      height: 24px;
      margin-right: 10px;
    }
    h1 {
      font-weight: 500;
      line-height: 30px;
      font-size: 24px;
    }
  }
  ul {
    height: calc(100% - 75px);
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

export default Requests;
