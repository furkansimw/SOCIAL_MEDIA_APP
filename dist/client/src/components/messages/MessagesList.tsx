import React, { FC } from "react";
import { styled } from "styled-components";
import { IMessage } from "../../interfaces/IMessages";

type Props = {
  messages: IMessage[];
  setMessages: (newMesage: IMessage) => void;
};

const MessagesList: FC<Props> = ({ messages, setMessages }) => {
  return (
    <Container>
      <pre>{JSON.stringify(messages, null, 2)}</pre>
    </Container>
  );
};

const Container = styled.ul`
  width: 100%;
  overflow-y: auto;
  height: calc(100% - 78px - 75px);
`;

export default MessagesList;
