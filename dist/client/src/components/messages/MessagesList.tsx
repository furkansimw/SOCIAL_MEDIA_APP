import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
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
  ({ room, setRoom }, messageListref) => {
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

    function transformList() {
      let a = [];
      let count = 1;

      for (let i = 0; i < messages.length; i++) {
        if (
          i === messages.length - 1 ||
          dateViewer(messages[i].created) !==
            dateViewer(messages[i + 1].created)
        ) {
          if (count === 1) a.push("single");
          else if (count === 2) a.push("first", "last");
          else if (count === 3) a.push("first", "middle", "last");
          else a.push("first", ...Array(count - 2).fill("middle"), "last");

          count = 1;
        } else count++;
      }

      return a;
    }

    const xd = transformList();

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
            const ref = (messageListref as React.RefObject<HTMLUListElement>)
              .current!;

            const a = ref.scrollHeight;
            ref.scroll({ top: scrollTop + (a - currentSH) });
            setS(false);
          }, 1);
        });
      }
    };

    return (
      <Container
        ref={messageListref}
        onScroll={onScroll}
        className="messageslist coolsb"
      >
        {loading && <LoadingBox />}
        {messages.map((message, index) => (
          <MessageItem
            message={message}
            viewDate={calc(index)}
            base={xd[index]}
          />
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

  .view-date {
    text-align: center;
    font-size: 12px;
    color: #a8a8a8;
    margin: 1rem 0px;
  }
`;

export default memo(MessagesList);
