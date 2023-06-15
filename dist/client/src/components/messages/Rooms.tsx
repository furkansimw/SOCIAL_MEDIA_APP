import React, { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { styled } from "styled-components";
import { selectValues } from "../../redux/profileReducer";
import { NewMessage } from "../Icons";
import { GetMessageContext } from "../../context/MessagesContextProvider";
import { IRoom } from "../../interfaces/IMessages";
import { Link, useNavigate } from "react-router-dom";
import { deleteRoom, getRooms } from "../../api/messages";
import { dateCalc } from "../post/postpopup/Bottom";
import DeletePopup from "./DeletePopup";

const Rooms = ({
  open,
  setRequests,
  setRoom,
  room: _room,
}: {
  open: () => void;
  setRequests: React.Dispatch<React.SetStateAction<boolean>>;
  setRoom: React.Dispatch<React.SetStateAction<IRoom | null>>;
  room: IRoom | null;
}) => {
  const { rooms, hasmore, loading, setLoading, setRooms, setHasmore } =
    GetMessageContext();
  const onScroll = (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target as Element;

    if (loading || !hasmore) return;
    if (scrollTop + clientHeight + 100 >= scrollHeight) {
      getRooms(false).then((_rooms) => {
        setRooms((prev) => [...prev, ...rooms]);
        setLoading(false);
        setHasmore(_rooms.length == 12);
      });
    }
  };
  const { id: myid } = useSelector(selectValues, shallowEqual);
  const textController = (r: IRoom) => {
    const { last_message_type } = r;
    const user = r.last_message_owner == myid ? `you` : r.username;
    if ([0, 3].includes(last_message_type!)) {
      return r.last_message_content!;
    } else if (r.last_message_type! == 1) {
      return `${user} image sended.`;
    } else if (last_message_type == 2) {
      return `${user} shared post.`;
    }
    return "";
  };
  const { username: myusername } = useSelector(selectValues, shallowEqual);
  const [deletePopup, setDeletePopup] = useState<{
    active: boolean;
    room: IRoom | null;
  }>({
    active: false,
    room: null,
  });
  const nav = useNavigate();
  const deleteF = () =>
    deleteRoom(deletePopup.room?.room_id || "").then(() => {
      setRooms((prev) =>
        prev.filter((p) => p.room_id != deletePopup.room?.room_id)
      );
      nav("/direct/inbox", { replace: true });
      cancelF();
    });
  const cancelF = () => setDeletePopup({ active: false, room: null });
  return (
    <Container className="messages">
      {deletePopup.active && (
        <DeletePopup deleteF={deleteF} cancelF={cancelF} />
      )}
      <Up open={open} />
      <T setRequests={setRequests} />
      <ul onScroll={onScroll} className="coolsb">
        {rooms
          .filter((a) => a.inbox && a.is_active)
          .map((room) => {
            const { room_id, username, pp, last_message_type } = room;
            return (
              <li
                className={`${room.room_id == _room?.room_id ? "a" : ""}  ${
                  room.last_message_owner != myusername &&
                  new Date(room.last_message_created || "").getTime() >
                    new Date(room.my_seen).getTime()
                    ? "not-seen"
                    : "seen"
                }`}
                onClick={() => setRoom(room)}
              >
                <Link className="bx" to={`/direct/inbox/${room_id}`}>
                  <Link className="pp" to={`/${username}`}>
                    <img src={pp || "/pp.jpg"} alt="pp" />
                  </Link>
                  <div className="text">
                    <p className="username">{username}</p>
                    {last_message_type != null && (
                      <span>
                        <p className={`lmc`}>{textController(room)}</p>
                        <span className="da">
                          {dateCalc(room.last_message_created || "")}
                        </span>
                      </span>
                    )}
                    <div className="blue-circle"></div>
                  </div>
                </Link>
                <button
                  className="delete"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDeletePopup({ active: true, room });
                  }}
                >
                  <p>Delete</p>
                  <div className="layer"></div>
                </button>
              </li>
            );
          })}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  min-width: 400px;
  height: 100vh;
  width: 400px;
  max-width: 400px;
  .loading-box {
    margin: 2rem 0px;
  }
  .up {
    margin-top: 10px;
    min-height: 75px;
    height: 75px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 2rem 20px 0px;
    p {
      font-weight: 700;
      font-size: 20px;
      line-height: 25px;
    }
  }
  .t {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    h1 {
      font-size: 1rem;
      font-weight: 700;
      line-height: 20px;
    }
    button {
      font-size: 14px;
      color: #a8a8a8;
      line-height: 18px;
      font-weight: 600;
    }
  }
  ul {
    height: calc(100vh - 125px);
    width: 100%;
    overflow: hidden;
    overflow: hidden;
    overflow-y: auto;
    li {
      display: flex;
      position: relative;
      justify-content: space-between;
      .delete {
        position: relative;
        background-color: #000;
        p {
          color: #ed4956;
          font-weight: 600;
          font-size: 14px;
          transition: 0.3s ease-in-out all;
          position: relative;
          z-index: 100;
        }
        min-width: 64px;
        display: none;
        width: 64px;
        .layer {
          width: 0px;
          height: 100%;
          overflow: hidden;
          position: absolute;
          top: 0px;
          right: 0px;
          background-color: #000;
          transition: 0.5s ease-in-out all;
        }
        &:hover {
          p {
            color: #ed4956;
          }
          .layer {
            @keyframes anx {
              0% {
                width: 0px;
                background-color: red;
              }
              50% {
                border-radius: 0px;
                width: 400px;
              }

              100% {
                background-color: #fff;
                width: 100%;
                border-radius: 8px 0px 0px 8px;
              }
            }
            animation: anx 0.5s ease-in-out forwards;
          }
        }
      }
      &:hover {
        .delete {
          display: block;
        }
      }
      .blue-circle {
        background-color: #0095f6;
        width: 8px;
        height: 8px;
        position: absolute;
        right: 24px;
        top: 2rem;
        border-radius: 100%;
        display: none;
      }
      &:hover {
        background-color: #262626;
      }
      &.a {
        background-color: #363636 !important;
      }
      .bx {
        display: flex;
        padding: 12px;
        width: calc(100% - 4rem);
        .pp {
          width: 44px;
          margin-right: 12px;
          height: 44px;
          img {
            width: 44px;
            height: 44px;
            border-radius: 100%;
          }
        }
      }
      span {
        display: flex;
        align-items: center;
      }
      &.not-seen {
        .lmc {
          color: #fff;
          font-weight: 700;
        }
        .username {
          color: #fff;
          font-weight: 600;
        }
        .blue-circle {
          display: block;
        }
      }
      .lmc {
        font-size: 14px;
        color: #a8a8a8;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .da {
        margin-left: 10px;
        font-size: 14px;
        color: #a8a8a8;
      }
    }
  }
`;

const Up = ({ open }: { open: () => void }) => {
  const { username } = useSelector(selectValues, shallowEqual);
  return (
    <div className="up">
      <p>{username}</p>
      <button onClick={open}>
        <NewMessage />
      </button>
    </div>
  );
};

const T = ({}: {
  setRequests: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <div className="t">
    <h1>Messages</h1>
    <button onClick={() => {}}>Requests</button>
  </div>
);

export default Rooms;
