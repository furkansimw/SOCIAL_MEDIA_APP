import Title from "../components/Title";
import { useNavigate, useParams } from "react-router-dom";
import Rooms from "../components/messages/Rooms";
import MessagesContent from "./MessagesContent";
import { styled } from "styled-components";
import MessageInfo from "../components/messages/MessageInfo";
import { useEffect, useState } from "react";

const Messages = () => {
  const { messagegroupid: s } = useParams();
  const [messagegroupid, setMessagegroupid] = useState(s);
  const nav = useNavigate();
  const [requests, setRequests] = useState(false);

  useEffect(() => {
    setMessagegroupid(s);
    const worker = (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        setMessagegroupid(undefined);
        if (window.location.pathname == "/direct/inbox") setRequests(false);
        else nav("/direct/inbox");
      }
    };
    window.addEventListener("keydown", worker);
    return () => {
      window.removeEventListener("keydown", worker);
    };
  }, [s]);

  return (
    <Container>
      <Title title="Messages" />
      <Rooms
        messagegroupid={messagegroupid}
        requests={requests}
        setMessagegroupid={setMessagegroupid}
        setRequests={setRequests}
      />
      {messagegroupid ? (
        <MessagesContent
          setMessagegroupid={setMessagegroupid}
          messagegroupid={messagegroupid}
        />
      ) : (
        <MessageInfo />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: calc(100vw - 73px);
  position: absolute;
  left: 73px;
  top: 0px;
`;

export default Messages;
