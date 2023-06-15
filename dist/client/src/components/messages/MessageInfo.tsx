import { memo } from "react";
import { MessageIconIcon } from "../Icons";
import { styled } from "styled-components";

const MessageInfo = ({ open }: { open: () => void }) => {
  return (
    <Container>
      <MessageIconIcon />
      <h1>Your messages</h1>
      <p>Send private photos and messages to a friend</p>
      <button onClick={open}>Send a message</button>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  svg {
    margin-bottom: 1rem;
  }
  h1 {
    font-size: 20px;
    font-weight: 400;
    line-height: 25px;
    margin-bottom: 4px;
  }
  p {
    font-size: 14px;
    color: #a8a8a8;
    margin-bottom: 1rem;
  }
  button {
    background-color: #0095f6;
    font-size: 14px;
    color: #fff;
    padding: 7px 1rem;
    border-radius: 8px;
    font-weight: 600;
    &:hover {
      background-color: #1877f2;
    }
  }
`;

export default memo(MessageInfo);
