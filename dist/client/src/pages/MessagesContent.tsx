import React, { FC, memo, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { GetMessageContext } from "../context/MessagesContextProvider";
import { getMessages, getRoom, sendMessage } from "../api/messages";
import { useNavigate } from "react-router-dom";
import MessagesList from "../components/messages/MessagesList";
import { shallowEqual, useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { selectValues, setUnreadMessageCount } from "../redux/profileReducer";
import { AddImage } from "../components/Icons";
import { ToastContainer } from "react-toastify";
import { IMessage } from "../interfaces/IMessages";
import { useSelector } from "react-redux";

type props = {
  messagegroupid: string;
  setMessagegroupid: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const MessagesContent: FC<props> = ({ messagegroupid, setMessagegroupid }) => {
  const { rooms, setRooms } = GetMessageContext();

  const [room, setRoom] = useState(
    rooms.find((r) => r.room_id == messagegroupid)
  );
  const nav = useNavigate();
  useEffect(() => {
    const data = rooms.find((r) => r.room_id == messagegroupid);
    setRoom(data);
    if (!data)
      getRoom(messagegroupid)
        .then((room) => {
          if (room == null) nav("/direct/inbox", { replace: true });
          else setRoom(room);
        })
        .catch(() => nav("/direct/inbox", { replace: true }));
  }, [messagegroupid]);

  useEffect(() => {
    scrollBottom();
    if (!room) return;
    if (room.messages.length == 0 && room.hasmore) {
      getMessages(messagegroupid)
        .then((messages) => {
          const hasmore = messages.length == 24;
          const loading = false;
          setRoom({ ...room, messages, loading, hasmore });
          setTimeout(scrollBottom, 0);
        })
        .catch(() => nav("/direct/inbox", { replace: true }));
    }
  }, [room]);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // current room update rooms
    if (!room) return;
    const isExistsRoom = rooms.find((r) => r.room_id == room.room_id);

    if (isExistsRoom) {
      dispatch(setUnreadMessageCount("desc"));
      const prev = rooms.map((r) => {
        if (r.room_id == room.room_id) return room;
        return r;
      });
      setRooms(prev);
    } else setRooms((prev) => prev.concat(room));
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
    sendMessage(room_id, message, 0, isrepliying).then((r) => {
      if (messages.length > 0) {
        const m: IMessage = {
          id: r.id,
          owner: myid,
          username: myusername,
          pp: null,
          content: message,
          type: isrepliying ? 3 : 0,
          reply: isrepliying,
          created: r.created,
          room: room!.room_id,
        };

        const a = messages;
        a.push(m);
        setRoom({ ...room, messages: a });
      }
    });
    const m: IMessage = {
      id: "loading",
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
  };

  const textarearef = useRef<HTMLTextAreaElement>(null);
  const myFormRef = useRef<HTMLFormElement>(null);

  const onKeyDownTextArea = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code == "Enter" && e.shiftKey == false) {
      e.preventDefault();
      myFormRef.current!.requestSubmit();
    }
  };

  const scrollBottom = () => {
    const ml = document.querySelector(".messageslist");
    if (!ml) return;
    ml.scroll({ top: ml.scrollHeight });
  };

  if (!room) return <></>;

  const { room_id, messages } = room;

  const setMessages = (newMesage: IMessage) =>
    setRoom({ ...room, messages: [...messages, newMesage] });

  return (
    <Container>
      <ToastContainer theme="dark" />
      <div className="headerxd">
        <div className="left">
          <div className="pp"></div>
        </div>
      </div>
      <MessagesList room={room} setRoom={setRoom} />
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
                  sendMessage(room_id, imagesrc, 1, null).then((r) => {
                    setRoom({ ...room, messages: [...room.messages, r] });
                  });
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
  transition: 0.3s ease-in-out all;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 900px) {
    width: calc(100vw - 73px - 120px);
  }
  height: 100vh;
  .headerxd {
    width: 100%;
    min-height: 75px;
    border-bottom: 1px solid #262626;
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
