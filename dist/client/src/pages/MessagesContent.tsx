import React, { FC, memo, useEffect, useState } from "react";
import { styled } from "styled-components";
import { GetMessageContext } from "../context/MessagesContextProvider";
import { getMessages, getRoom, sendMessage } from "../api/messages";
import { useNavigate } from "react-router-dom";
import MessagesList from "../components/messages/MessagesList";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { setUnreadMessageCount } from "../redux/profileReducer";
import { AddImage } from "../components/Icons";
import { ToastContainer, toast } from "react-toastify";
import { IMessage } from "../interfaces/IMessages";

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
    if (!room) return;
    if (room.messages.length == 0 && room.hasmore) {
      getMessages(messagegroupid)
        .then((messages) => {
          const hasmore = messages.length == 24;
          const loading = false;
          setRoom({ ...room, messages, loading, hasmore });
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
    } else {
      setRooms((prev) => prev.concat(room));
    }
  }, [room]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      <MessagesList messages={messages} setMessages={setMessages} />
      <div className="bottom">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="message"
            id="message"
            placeholder="Message..."
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
                  sendMessage(room_id, imagesrc, 1).then((r) => {
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
          <button className="send" type="submit">
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
  @media screen and (max-width: 900px) {
    width: calc(100vw - 73px - 120px);
  }
  height: 100vh;
  .headerxd {
    width: 100%;
    height: 75px;
    border-bottom: 1px solid #262626;
  }
  .bottom {
    position: relative;
    height: 78px;
    width: 100%;
    min-width: 0px;
    form {
      position: relative;
      min-width: 0px;
      margin: 1rem;
      border: 1px solid #363636;
      display: flex;
      justify-content: center;
      align-items: center;
      width: calc(100% - 2rem) !important;
      border-radius: 22px;
      height: 44px;
      input[type="text"] {
        padding-left: 1rem;
        background-color: transparent;
        outline: none;
        border: none;
        width: 100% !important;
        min-width: 0px;
        font-size: 15px;
        line-height: 18px;
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
        font-weight: 600;
        font-size: 14px;
        color: #0095f6;
      }
    }
  }
`;

export default memo(MessagesContent);
