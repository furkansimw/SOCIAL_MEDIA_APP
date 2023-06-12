import React, { forwardRef, useImperativeHandle, useState } from "react";
import { styled } from "styled-components";
import { IRoom } from "../../interfaces/IMessages";
import MessageItem, { dateViewer } from "./MessageItem";
import { getMessages } from "../../api/messages";
import LoadingBox from "../LoadingBox";

type Props = {
  room: IRoom;
  setRoom: React.Dispatch<React.SetStateAction<IRoom | undefined>>;
};

const MessagesList = forwardRef<HTMLUListElement, Props>(
  ({ room, setRoom }, ref) => {
    const {
      messages,
      pp,
      username,
      my_seen,
      user_seen,
      loading,
      hasmore,
      room_id,
    } = room;

    const calc = (index: number) => {
      const cmd = dateViewer(messages[index].created);
      const bmd = dateViewer(messages[index == 0 ? 0 : index - 1].created);
      return cmd != bmd || index == 0;
    };
    const [s, setS] = useState(false);
    const onScroll = (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
      const { scrollTop, scrollHeight } = e.target as Element;
      if (loading || !hasmore) return;
      if (scrollTop <= 100) {
        if (s) return;
        setS(true);
        const date = messages[0].created;
        const id = messages[0].id;
        setRoom({ ...room, loading: true });
        const currentSH = scrollHeight;
        getMessages(room_id, { date, id }).then((messages) => {
          const hasmore = messages.length == 24;
          const loading = false;
          setRoom({
            ...room,
            loading,
            hasmore,
            messages: [...messages, ...room.messages],
          });
          setTimeout(() => {
            const a = document.querySelector(".messageslist")!.scrollHeight;
            document
              .querySelector(".messageslist")!
              .scroll({ top: scrollTop + (a - currentSH) });
            setS(false);
          }, 1);
        });
      }
    };

    return (
      <Container ref={ref} onScroll={onScroll} className="messageslist">
        {loading && <LoadingBox />}
        {messages.map((message, index) => (
          <MessageItem message={message} viewDate={calc(index)} />
        ))}
      </Container>
    );
  }
);

const Container = styled.ul`
  width: 100%;
  overflow-y: auto;
  height: 100%;
  overflow-x: hidden;
  .loading-box {
    margin: 2rem 0px;
  }
  &::-webkit-scrollbar-thumb {
    opacity: 1 !important;
    height: 1px;
  }
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    width: 8px;
    background-color: #262626;
    border-radius: 8px;
    opacity: 0;
    &:active {
      background-color: #363636;
    }
  }
  .view-date {
    text-align: center;
    font-size: 14px;
    color: #a8a8a8;
  }
`;

export default MessagesList;
