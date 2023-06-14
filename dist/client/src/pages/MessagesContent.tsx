import React, { FC, memo, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { getMessages, sendMessage } from "../api/messages";
import { shallowEqual } from "react-redux";
import { selectValues } from "../redux/profileReducer";
import { AddImage } from "../components/Icons";
import { IMessage, IRoom } from "../interfaces/IMessages";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import MessageListItem from "../components/messages/MessageListItem";
import transformList, { dateViewer } from "../components/messages/base";

type props = {
  room: IRoom;
  setRoom: React.Dispatch<React.SetStateAction<IRoom | null>>;
};

const MessagesContent: FC<props> = ({ room, setRoom }) => {
  const scrollBottom = () =>
    document.querySelector(".messagelist")?.scroll({
      top: document.querySelector(".messagelist")?.scrollHeight,
    });

  useEffect(() => {
    if (room.hasmore && !room.loading && room.messages.length == 0) {
      setRoom({ ...room, loading: true });
      getMessages(room.room_id).then((messages) => {
        setRoom({
          ...room!,
          messages,
          loading: false,
          hasmore: messages.length == 24,
        });
        setTimeout(scrollBottom, 200);
      });
    }
  }, [room]);

  const [message, setMessage] = useState("");
  const [isrepliying, setIsRepliying] = useState<string | null>(null);
  const { id: myid, username: myusername } = useSelector(
    selectValues,
    shallowEqual
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!room) return;
    if (message.trim().length == 0) return;
    const id = v4();
    sendMessage(room_id, message, 0, isrepliying, id);
    const m: IMessage = {
      id,
      owner: myid,
      username: myusername,
      pp: null,
      content: message,
      type: isrepliying ? 3 : 0,
      reply: isrepliying,
      created: new Date(Date.now()).toISOString(),
      room: room!.room_id,
    };
    setMessage("");
    setMessages(m);
    textarearef.current!.style.height = "18px";
    setTimeout(scrollBottom, 1);
  };

  const textarearef = useRef<HTMLTextAreaElement>(null);
  const myFormRef = useRef<HTMLFormElement>(null);
  const messagesListRef = useRef<HTMLUListElement>(null);
  const onKeyDownTextArea = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code == "Enter" && e.shiftKey == false) {
      e.preventDefault();
      myFormRef.current!.requestSubmit();
    }
  };

  const setMessages = (newMesage: IMessage) => {
    if (!room) return;
    setRoom({
      ...room,
      messages: [...messages, newMesage],
      inbox: true,
      last_message_content: newMesage.content,
      last_message_created: newMesage.created,
      last_message_id: newMesage.id,
      last_message_owner: newMesage.owner,
      last_message_type: newMesage.type,
    });
    setTimeout(scrollBottom, 1);
  };

  const onScroll = (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
    const { scrollTop, scrollHeight } = e.target as Element;
    const { loading, hasmore } = room;
    if (loading || !hasmore) return;
    if (messages.length == 0) return;
    if (scrollTop <= 100) {
      setRoom({ ...room, loading: true });
      getMessages(room.room_id, {
        date: room.messages[0].created,
        id: room.messages[0].id,
      }).then((messages) => {
        const a = scrollHeight;
        setRoom({
          ...room,
          messages: [...messages, ...room.messages],
          hasmore: messages.length == 24,
          loading: false,
        });
        setTimeout(() => {
          const diff = document.querySelector(".messagelist")!.scrollHeight - a;
          document.querySelector(".messagelist")!.scrollTop += diff;
        }, 1);
      });
    }
  };

  if (!room) return <></>;

  const { room_id, messages } = room;

  const classNameList = transformList(messages);

  return (
    <Container>
      <div className="headerxd">
        <div className="left">
          <div className="pp"></div>
        </div>
      </div>
      <ul
        onScroll={onScroll}
        ref={messagesListRef}
        className="messagelist coolsb"
      >
        {messages.map((msg, index) => (
          <MessageListItem
            msg={msg}
            dateView={
              dateViewer(msg.created) !=
              dateViewer(messages[(index == 0 ? 1 : index) - 1].created)
            }
            classN={classNameList[index]}
            setPostData={(pd: any) => {
              setRoom((prev) => {
                if (prev?.room_id == room_id) {
                  const m = prev.messages.map((_) => {
                    if (_.id == msg.id) return { ..._, postdata: pd };
                    return _;
                  });
                  return { ...prev, messages: m };
                }
                return prev;
              });
            }}
          />
        ))}
      </ul>
      <div className="bottom">
        <form ref={myFormRef} onSubmit={onSubmit}>
          <textarea
            ref={textarearef}
            name="message"
            id="message"
            placeholder="Message..."
            autoFocus
            onKeyDown={onKeyDownTextArea}
            rows={1}
            maxLength={500}
            onChange={(e) => {
              setMessage(e.target.value);
              textarearef.current!.style.height = "auto";
              textarearef.current!.style.height = `${e.target.scrollHeight}px`;
            }}
            value={message}
          />
          <button type="button" className="image">
            <AddImage />
            <input
              onChange={async (e) => {
                const image = e.target.files;
                if (image?.length == 0) return;
                if (image == null) return;
                const img = Array.from(image)[0];
                const conv = (file: File) =>
                  new Promise((resolve, reject) => {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                      resolve(reader.result as string);
                    };
                    reader.onerror = function () {
                      reject(reader.error as any as string);
                    };
                  });
                try {
                  const imagesrc = (await conv(img)) as any;
                  const id = v4();
                  const m: IMessage = {
                    id,
                    owner: myid,
                    username: myusername,
                    pp: null,
                    content: imagesrc,
                    type: 1,
                    reply: null,
                    created: new Date(Date.now()).toISOString(),
                    room: room!.room_id,
                  };
                  setMessages(m);
                  setTimeout(scrollBottom, 100);
                  sendMessage(room_id, imagesrc, 1, null, id);
                } catch (error) {}
              }}
              accept="image/jpeg, image/png, image/jpg"
              type="file"
              name="image"
              id="image"
            />
          </button>
          <button
            disabled={message.trim().length == 0}
            className="send"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: calc(100vw - 73px - 400px);
  display: flex;
  flex-direction: column;
  height: 100vh;
  .headerxd {
    width: 100%;
    min-height: 75px;
    border-bottom: 1px solid #262626;
  }
  .messagelist {
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    padding: 0px 1rem;
    .date {
      text-align: center;
      margin: 2rem 0px;
      font-size: 12px;
      color: #a8a8a8;
    }
  }
  .bottom {
    position: relative;
    width: 100%;
    height: min-content;
    min-width: 0px;
    margin: 1rem;
    form {
      position: relative;
      min-width: 0px;
      border: 1px solid #363636;
      display: flex;
      justify-content: center;
      align-items: start;
      width: calc(100% - 2rem) !important;
      border-radius: 22px;
      padding: 10px 0px;
      textarea {
        margin-top: 2px;
        height: 18px;
        padding-left: 1rem;
        color: #fafafa;
        background-color: transparent;
        outline: none;
        border: none;
        width: 100%;
        min-width: 0px;
        font-size: 1rem;
        line-height: 18px;
        resize: none;
        height: 18px;
        max-height: 180px;
        &::-webkit-scrollbar {
          display: none;
        }
      }
      .image {
        margin: 0px 1rem;
        position: relative;
        cursor: pointer;
        input {
          position: absolute;
          left: 0px;
          top: 0px;
          width: 100%;
          height: 100%;
          cursor: pointer;
          opacity: 0;
        }
      }
      .send {
        line-height: 18px;
        margin-right: 20px;
        margin-top: 3px;
        font-weight: 600;
        font-size: 14px;
        color: #0095f6;
        &:disabled {
          opacity: 0.8;
          pointer-events: none;
          cursor: default;
        }
      }
    }
  }
`;

export default memo(MessagesContent);
