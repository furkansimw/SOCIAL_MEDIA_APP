import React, { FC, memo, useEffect, useState } from "react";
import { styled } from "styled-components";
import { GetMessageContext } from "../context/MessagesContextProvider";
import { getMessages, getRoom } from "../api/messages";
import { useNavigate } from "react-router-dom";
import MessagesList from "../components/messages/MessagesList";

type props = {
  messagegroupid: string;
  setMessagegroupid: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const MessagesContent: FC<props> = ({ messagegroupid, setMessagegroupid }) => {
  const { rooms, setRooms } = GetMessageContext();

  const [room, setRoom] = useState(rooms.find((r) => r.rid == messagegroupid));
  const nav = useNavigate();
  useEffect(() => {
    const data = rooms.find((r) => r.rid == messagegroupid);
    setRoom(data);
    if (!data)
      getRoom(messagegroupid)
        .then(setRoom)
        .catch(() => nav("/direct/inbox"));
  }, [messagegroupid]);

  useEffect(() => {
    if (!room) return;
    if (room.messages.length == 0 && room.hasmore) {
      getMessages(messagegroupid)
        .then((messages) => {
          const hasmore = messages.length == 24;
          const loading = false;

          setRoom({ ...room, messages, loading, hasmore });
        })
        .catch(() => {
          const hasmore = false;
          const loading = false;
          setRoom({ ...room, loading, hasmore });
        });
    }
  }, [room]);

  useEffect(() => {
    if(room.)
  }, [room]);

  if (!room) return <></>;

  return (
    <Container>
      <div className="headerxd">
        <div className="left">
          <div className="pp"></div>
        </div>
      </div>
      <MessagesList />
    </Container>
  );
};

const Container = styled.div`
  background-color: #000;
  width: 100%;
  .headerxd {
    height: 75px;
    border-bottom: 1px solid #262626;
  }
`;

export default memo(MessagesContent);
