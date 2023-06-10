import React, { FC, useState } from "react";
import { NewMessage } from "../Icons";
import { shallowEqual, useSelector } from "react-redux";
import { selectValues } from "../../redux/profileReducer";
import { styled } from "styled-components";
import MessagesPopup from "./MessagesPopup";
import { GetMessageContext } from "../../context/MessagesContextProvider";
import { IRoom } from "../../interfaces/IMessages";
import { disableRightClick } from "../navigation/Navigation";
import { useNavigate } from "react-router-dom";

type Props = {
  openRequest: () => void;
  setMessagegroupid: React.Dispatch<React.SetStateAction<string | undefined>>;
  messagegroupid: string | undefined;
  isActive: boolean;
};

const Messages: FC<Props> = ({
  openRequest,
  setMessagegroupid,
  messagegroupid,
  isActive,
}) => {
  const { username } = useSelector(selectValues, shallowEqual);
  const [mp, _mp] = useState(false);
  const newM = () => _mp(true);
  const close = () => _mp(false);

  const { rooms, setRooms } = GetMessageContext();
  const nav = useNavigate();
  const detail = (room: IRoom) =>
    room.type == 1
      ? "A image sended"
      : room.type == 2
      ? "A post shared"
      : room.mcontent;

  return (
    <Container className="messages">
      {mp && <MessagesPopup title="New message" close={close} />}
      <div className="up">
        <p className="u">{username}</p>
        <button onClick={newM}>
          <NewMessage />
        </button>
      </div>
      <div className="sc">
        <p className="t">Messages</p>
        <button onClick={openRequest}>Requests</button>
      </div>
      <ul>
        {rooms
          .filter((r) => r.inbox)
          .map((room) => (
            <li
              onClick={() => {
                nav(`/direct/inbox/${room.rid}`);
                setMessagegroupid(room.rid);
              }}
              className={messagegroupid == room.rid ? "active" : ""}
            >
              <div className="pp">
                <img
                  onContextMenu={disableRightClick}
                  src={room.pp || "/pp.jpg"}
                  alt="pp"
                />
                {room.is_online && <div className="circle"></div>}
              </div>
              <div className="text">
                <p className="u">{room.username}</p>
                <p className="d">{detail(room)}</p>
              </div>
            </li>
          ))}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  width: 400px;
  min-width: 400px;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  transition: 0.3s ease-in-out all;
  display: flex;
  flex-direction: column;
  .up {
    padding: 36px 24px 12px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      font-size: 20px;
      font-weight: 500;
      line-height: 25px;
    }
  }
  .sc {
    padding: 14px 24px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
      color: #a8a8a8;
      font-size: 14px;
      line-height: 20px;
      font-weight: 500;
      cursor: pointer;
    }
    p {
      font-size: 1rem;
      font-weight: 700;
      line-height: 20px;
    }
  }
  ul {
    height: 100%;
    overflow-y: auto;
    padding: 8px 0px;
    &::-webkit-scrollbar {
      width: 8px;
      background-color: #101010;
    }
    &::-webkit-scrollbar-thumb {
      width: 8px;
      background-color: #363636;
      border-radius: 8px;
      &:active {
        background-color: #464646;
      }
    }
    li {
      display: flex;
      cursor: pointer;
      padding: 10px 24px;
      &:hover {
        background-color: #363636;
      }
      &.active {
        background-color: #363636;
      }
      .pp {
        width: 44px;
        height: 44px;
        margin-right: 12px;
        position: relative;
        .circle {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 100%;
          bottom: 0px;
          right: 0px;
          z-index: 10;
          background-color: #1cd14f;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 100%;
        }
      }
      .text {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        .u {
          font-size: 14px;
          line-height: 18px;
        }
        .d {
          font-size: 14px;
          color: #a8a8a8;
        }
      }
    }
  }
`;

export default Messages;
