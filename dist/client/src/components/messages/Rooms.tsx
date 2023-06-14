import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { styled } from "styled-components";
import { selectValues } from "../../redux/profileReducer";
import { NewMessage } from "../Icons";
import { GetMessageContext } from "../../context/MessagesContextProvider";
import { IRoom } from "../../interfaces/IMessages";
import { Link } from "react-router-dom";
import { getRooms } from "../../api/messages";

const Rooms = ({
  open,
  setRequests,
  setRoom,
}: {
  open: () => void;
  setRequests: React.Dispatch<React.SetStateAction<boolean>>;
  setRoom: React.Dispatch<React.SetStateAction<IRoom | null>>;
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

  return (
    <Container className="messages">
      <Up open={open} />
      <T setRequests={setRequests} />
      <ul onScroll={onScroll} className="coolsb">
        {rooms
          .filter((a) => a.inbox)
          .map((room) => {
            const { room_id, username, pp, last_message_type } = room;
            return (
              <li onClick={() => setRoom(room)}>
                <Link className="bx" to={`/direct/inbox/${room_id}`}>
                  <Link className="pp" to={`/${username}`}>
                    <img src={pp || "/pp.jpg"} alt="pp" />
                  </Link>
                  <div className="text">
                    <p>{username}</p>
                    {last_message_type != null && (
                      <p className="lmc">{textController(room)}</p>
                    )}
                  </div>
                </Link>
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
      &:hover {
        background-color: #262626;
      }
      .bx {
        display: flex;
        padding: 12px;

        .pp {
          width: 44px;
          margin-right: 10px;
          height: 44px;
          img {
            width: 44px;
            height: 44px;
            border-radius: 100%;
          }
        }
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

const T = ({
  setRequests,
}: {
  setRequests: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <div className="t">
    <h1>Messages</h1>
    <button onClick={() => setRequests(true)}>Requests</button>
  </div>
);

export default Rooms;
