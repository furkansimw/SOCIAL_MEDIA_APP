import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { styled } from "styled-components";
import { CloseIcon } from "../Icons";
import { GetMessageContext } from "../../context/MessagesContextProvider";
import LinkQ from "../post/LinkQ";
import { disableRightClick } from "../navigation/Navigation";
import { shallowEqual, useSelector } from "react-redux";
import { selectValues } from "../../redux/profileReducer";
import { searchProfile } from "../../api/profile";
import LoadingBox from "../LoadingBox";
import { getRooms, sendMessage, startRoom } from "../../api/messages";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setBack, setCurrentPostId } from "../../redux/postsReducer";
import { toast } from "react-toastify";

type Props = {
  title: string;
  close: () => void;
};

type ISearchL = {
  username: string;
  id: string;
  pp: string | null;
  fullname: string | null;
};

const MessagesPopup: FC<Props> = ({ title, close }) => {
  const { rooms, setRooms } = GetMessageContext();
  const [searchL, setSearchL] = useState<ISearchL[]>([]);

  const [loading, setLoading] = useState(false);
  const [text, _text] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    _text(e.target.value.toLowerCase());

  useLayoutEffect(() => {
    setLoading(text.trim().length != 0);
    setSearchL([]);
    var timer: any;
    clearTimeout(timer);

    timer = setTimeout(() => {
      if (text.trim().length > 0) {
        searchProfile(text)
          .then(setSearchL)
          .finally(() => {
            setLoading(false);
          });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [text]);

  useEffect(() => {
    if (text.trim().length == 0) {
      if (rooms.length == 0) getRooms(false).then(setRooms);
    }
  }, [text]);

  const onScroll = (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target as Element;
    if (scrollTop + clientHeight + 100 >= scrollHeight) {
      if (text.trim().length == 0) {
        if (rooms.length % 12 == 0) {
          getRooms(false, {
            date: rooms[rooms.length - 1].last_message_created!,
            id: rooms[rooms.length - 1].last_message_id!,
          });
        }
      }
    }
  };

  const nav = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const tap = (userid: string) => {
    if (title == "Share") {
      startRoom(userid)
        .then((roomid) =>
          sendMessage(roomid, window.location.pathname.split("/")[2], 2, null)
        )
        .then((t) => {
          close();
          toast.info("Sucessfly shared post");
        });
    } else {
      startRoom(userid).then((roomid) => {
        close();
        dispatch(setCurrentPostId(null));
        dispatch(setBack(null));
        nav(`/direct/inbox/${roomid}`);
      });
    }
  };

  const tap2 = (rid: string) => {
    if (title == "Share") {
      sendMessage(rid, window.location.pathname.split("/")[2], 2, null).then(
        () => {
          close();
          toast.info("Shared post.");
        }
      );
    } else {
      close();
      dispatch(setCurrentPostId(null));
      dispatch(setBack(null));
      nav(`/direct/inbox/${rid}`);
    }
  };

  return (
    <>
      <Bg onClick={close} />
      <Container>
        <div className="headery">
          <p>{title}</p>
          <button onClick={close}>
            <CloseIcon />
          </button>
        </div>
        <div className="input-h">
          <p>To:</p>
          <input
            value={text}
            onChange={onChange}
            type="text"
            autoFocus
            placeholder="Search..."
          />
        </div>
        <ul onScroll={onScroll}>
          {loading && <LoadingBox />}
          {searchL.length == 0 && rooms.length == 0 && (
            <p className="naf">No account found.</p>
          )}
          {text.trim().length > 0 ? (
            <>
              {searchL.map((obj) => (
                <li onClick={() => tap(obj.id)} key={obj.username}>
                  <LinkQ className="pp" to={`/${obj.username}`}>
                    <img
                      onContextMenu={disableRightClick}
                      src={obj.pp || "/pp.jpg"}
                      alt="pp"
                    />
                  </LinkQ>
                  <div className="text">
                    <LinkQ to={`/${obj.username}`}>
                      <p className="username">{obj.username}</p>
                    </LinkQ>
                    {obj.fullname && <p className="fullname">{obj.fullname}</p>}
                  </div>
                </li>
              ))}
            </>
          ) : (
            <>
              {rooms.map((obj) => (
                <li key={obj.room_id} onClick={() => tap2(obj.room_id)}>
                  <LinkQ className="pp" to={`/${obj.username}`}>
                    <img
                      onContextMenu={disableRightClick}
                      src={obj.pp || "/pp.jpg"}
                      alt="pp"
                    />
                  </LinkQ>
                  <div className="text">
                    <LinkQ to={`/${obj.username}`}>
                      <p className="username">{obj.username}</p>
                    </LinkQ>
                    {obj.fullname && <p className="fullname">{obj.fullname}</p>}
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>
      </Container>
    </>
  );
};

const Bg = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  display: flex;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 500;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  left: 0px;
  top: 0px;
  z-index: 600;
  background-color: #262626;
  border-radius: 12px;
  max-width: 600px;
  max-height: 600px;
  height: 100%;
  width: 100%;
  left: calc(50% - 300px);
  top: calc(50% - 300px);
  @keyframes scale {
    0% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  animation: 0.1s scale ease-in-out;
  @media screen and (max-width: 664px) {
    left: 2rem;
    width: calc(100% - 4rem);
  }
  @media screen and (max-height: 664px) {
    top: 2rem;
    height: calc(100% - 4rem);
  }
  .headery {
    width: 100%;
    min-height: 56px;
    height: 56px;
    border-bottom: 1px solid #363636;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      line-height: 18px;
      font-weight: 700;
    }
    button {
      width: 34px;
      height: 34px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
  .input-h {
    padding: 12px;
    display: flex;
    p {
      font-weight: 600;
      line-height: 18px;
      font-size: 14px;
      padding: 12px;
    }
    input {
      padding: 4px 12px 4px 20px;
      outline: none;
      border: none;
      line-height: 30px;
      font-size: 14px;
      width: 100%;
      background-color: transparent;
    }
  }
  .naf {
    font-size: 14px;
    color: #a8a8a8;
    padding: 12px 24px;
  }
  .loading-box {
    background-color: transparent !important;
    position: relative !important;
    width: 100%;
    height: 2rem !important;
    min-height: 2rem !important;
    max-height: 2rem !important;
  }
  ul {
    li {
      display: flex;
      cursor: pointer;
      position: relative;
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      height: 60px;
      width: 100%;
      padding: 8px 24px;
      img {
        width: 44px;
        height: 44px;
        object-fit: cover;
        border-radius: 100%;
        margin-right: 12px;
      }
      .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        p {
          font-size: 14px;
          &.username {
            font-weight: 600;
          }
          &.fullname {
            color: #a8a8a8;
          }
        }
      }
      button {
        position: absolute;
        right: 24px;
        top: 22px;
        width: 1rem;
        height: 1rem;
      }
    }
  }
`;

export default MessagesPopup;
