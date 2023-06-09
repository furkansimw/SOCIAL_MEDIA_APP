import Title from "../components/Title";
import { useParams } from "react-router-dom";
import Rooms from "../components/messages/Rooms";
import MessagesContent from "./MessagesContent";
import { styled } from "styled-components";
import MessageInfo from "../components/messages/MessageInfo";

const Messages = () => {
  const { messagegroupid } = useParams();
  return (
    <Container>
      <Title title="Messages" />
      <Rooms />
      {messagegroupid && <MessagesContent messagegroupid={messagegroupid} />}
      {!messagegroupid && <MessageInfo />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  position: absolute;
  left: 73px;
  top: 0px;
`;

export default Messages;
