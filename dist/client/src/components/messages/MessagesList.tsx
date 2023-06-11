import React, { forwardRef, useImperativeHandle } from "react";
import { styled } from "styled-components";
import { IRoom } from "../../interfaces/IMessages";
import MessageItem from "./MessageItem";
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
      const cmd = new Date(messages[index].created).getTime();
      const bmd = new Date(
        messages[index == 0 ? 0 : index - 1].created
      ).getTime();
      return cmd != bmd || index == 0;
    };

    const onScroll = (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
      const { scrollTop, scrollHeight } = e.target as Element;
      if (loading || !hasmore) return;

      if (scrollTop <= 100) {
        const date = messages[0].created;
        const id = messages[0].id;
        setRoom({ ...room, loading: true });
        const scrollHeightS = scrollHeight;
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
            const messagesRef = document.querySelector(".messageslist")!;
            const newScrollTop = messagesRef.scrollHeight - scrollHeightS;
            messagesRef.scrollTop += newScrollTop - messagesRef.clientHeight;
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
`;

export default MessagesList;
