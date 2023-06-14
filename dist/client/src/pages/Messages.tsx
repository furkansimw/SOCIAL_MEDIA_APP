import Title from "../components/Title";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Rooms from "../components/messages/Rooms";
import MessagesContent from "./MessagesContent";
import { styled } from "styled-components";
import MessageInfo from "../components/messages/MessageInfo";
import { useEffect, useState } from "react";
import MessagesPopup from "../components/messages/MessagesList";
import Requests from "../components/messages/Requests";
import { IRoom } from "../interfaces/IMessages";
import { getMessages, getRoom, getRooms } from "../api/messages";
import { GetMessageContext } from "../context/MessagesContextProvider";

const Messages = () => {
  const { messagegroupid: s } = useParams();
  const [messageListPopup, setMessageListPopup] = useState(false);
  const close = () => setMessageListPopup(false);
  const open = () => setMessageListPopup(true);

  const nav = useNavigate();
  const [requests, setRequests] = useState(false);
  const [room, setRoom] = useState<IRoom | null>(null);
  const { pathname } = useLocation();
  const { setRooms, setHasmore, rooms } = GetMessageContext();

  useEffect(() => {
    if (pathname == "/direct/inbox") setRoom(null);

    const worker = (e: KeyboardEvent) => {
      if (e.key == "Escape") {
        if (window.location.pathname == "/direct/inbox") setRequests(false);
        else {
          nav("/direct/inbox");
          setRoom(null);
        }
      }
    };
    window.addEventListener("keydown", worker);
    return () => {
      window.removeEventListener("keydown", worker);
    };
  }, [pathname]);

  // useEffect(() => {
  //   if (s) {
  //     const isE = rooms.find((room) => room.room_id == s);
  //     if (isE) {
  //       setRoom(isE);
  //     } else {
  //       getRoom(s)
  //         .then((_room: IRoom) => {
  //           setRoom({ ..._room, messages: [], hasmore: true, loading: true });
  //           setTimeout(
  //             () =>
  //               getMessages(s).then((_messages) => {
  //                 setRoom({
  //                   ..._room,
  //                   messages: _messages,
  //                   loading: false,
  //                   hasmore: _messages.length == 24,
  //                 });
  //               }),
  //             1
  //           );
  //         })
  //         .catch(() => {
  //           setRoom(null);
  //           back();
  //         });
  //     }
  //   }
  // }, [s]);

  useEffect(() => {
    if (rooms.length == 0) {
      getRooms(false).then((_rooms: IRoom[]) => {
        const _roomsdata = _rooms.map((_a) => ({
          ..._a,
          messages: [],
          hasmore: true,
        }));
        setRooms(_roomsdata);
        setHasmore(_roomsdata.length == 12);

        if (s) {
          const isExists = _roomsdata.find((r) => r.room_id == s);
          if (isExists) {
            setRoom({ ...isExists, loading: true });
            getMessages(s).then((_messages) => {
              setRoom({
                ...isExists,
                messages: _messages,
                loading: false,
                hasmore: _messages.length == 24,
              });
              setTimeout(() => {
                document.querySelector(".messagelist")?.scroll({
                  top: document.querySelector(".messagelist")?.scrollHeight,
                });
              }, 200);
            });
          } else {
            getRoom(s)
              .then((_room: IRoom) => {
                setRoom({
                  ..._room,
                  messages: [],
                  hasmore: true,
                  loading: true,
                });
                setTimeout(
                  () =>
                    getMessages(s).then((_messages) => {
                      setRoom({
                        ..._room,
                        messages: _messages,
                        loading: false,
                        hasmore: _messages.length == 24,
                      });
                      setTimeout(() => {
                        document.querySelector(".messagelist")?.scroll({
                          top: document.querySelector(".messagelist")
                            ?.scrollHeight,
                        });
                      }, 200);
                    }),
                  1
                );
              })
              .catch(() => {
                setRoom(null);
                back();
              });
          }
        }
      });
    }
  }, []);
  useEffect(() => {
    if (room) {
      const isExists = rooms.find((room) => room.room_id == room.room_id);

      if (isExists) {
        setRooms(
          rooms.map((r) => {
            if (r.room_id == room.room_id) return room;
            return r;
          })
        );
      } else {
        setRooms([room, ...rooms]);
      }
    }
    setTimeout(() => {
      setRooms((prev) =>
        prev.sort(
          (a, b) =>
            new Date(b.last_message_created || "").getTime() -
            new Date(a.last_message_created || "").getTime()
        )
      );
    }, 1);
  }, [room]);
  const back = () => nav("/direct/inbox", { replace: true });

  return (
    <Container className={requests ? `r` : ""}>
      <Title title="Messages" />
      {messageListPopup && <MessagesPopup title="New message" close={close} />}
      <div className="l">
        <Rooms
          setRequests={setRequests}
          open={open}
          setRoom={setRoom}
          room={room}
        />
        <Requests isactive={requests} />
      </div>
      {room ? (
        <MessagesContent room={room} setRoom={setRoom} />
      ) : (
        <MessageInfo open={open} />
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
  .requests {
    width: 0px !important;
    overflow: hidden;
    transition: 0.3s ease-in-out all;
  }
  .messages {
    transition: 0.3s ease-in-out all;
    overflow: hidden;
  }
  &.r {
    .requests {
      width: 100% !important;
    }
    .messages {
      width: 0px !important;
      min-width: 0px !important;
    }
  }
  .l {
    border-right: 1px solid #262626;
    display: flex;
    height: 100vh;
    width: 400px;
    max-width: 400px;
    min-width: 400px;
  }
`;

export default Messages;
