import { FC, memo, useEffect, useLayoutEffect } from "react";
import { styled } from "styled-components";
import Messages from "./Messages";
import Requests from "./Requests";
import { GetMessageContext } from "../../context/MessagesContextProvider";
import { getRooms } from "../../api/messages";
import socket from "../../api/socket/socket";
import { IMessage } from "../../interfaces/IMessages";

type Props = {
  requests: boolean;
  setRequests: React.Dispatch<React.SetStateAction<boolean>>;
  setMessagegroupid: React.Dispatch<React.SetStateAction<string | undefined>>;
  messagegroupid: string | undefined;
};

const Rooms: FC<Props> = ({
  requests,
  setRequests,
  setMessagegroupid,
  messagegroupid,
}) => {
  const openRequest = () => setRequests(true);
  const closeRequest = () => setRequests(false);

  const { rooms, setRooms } = GetMessageContext();

  useLayoutEffect(() => {
    if (rooms.length == 0) getRooms(false).then(setRooms);
  }, []);

  useEffect(() => {
    socket.on("message", (message: IMessage) => {
      const isExistsRoom = rooms.find((room) => message.room);
    });
  }, []);

  return (
    <Container className={requests ? "r" : "m"}>
      <Messages
        openRequest={openRequest}
        messagegroupid={messagegroupid}
        setMessagegroupid={setMessagegroupid}
      />
      <Requests
        closeRequest={closeRequest}
        messagegroupid={messagegroupid}
        setMessagegroupid={setMessagegroupid}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  border-right: 1px solid #363636;
  min-width: 400px;
  width: 400px;
  transition: 0.3s ease-in-out all;
  @media screen and (max-width: 900px) {
    .messages {
      width: 120px !important;
      min-width: 120px !important;
      .up {
        justify-content: center !important;
        .u {
          display: none !important;
        }
      }
      .sc {
        display: none !important;
      }
    }
    &.m {
      width: 120px;
      min-width: 120px !important;
    }
  }
  &.r {
    .messages {
      width: 0px !important;
      min-width: 0px !important;
    }
  }
  &.m {
    .requests {
      width: 0px;
    }
  }
`;

export default memo(Rooms);
