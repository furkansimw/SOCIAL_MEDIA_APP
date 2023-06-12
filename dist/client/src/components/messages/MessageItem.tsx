import { FC, useMemo } from "react";
import { IMessage } from "../../interfaces/IMessages";
import { styled } from "styled-components";
import { disableRightClick } from "../navigation/Navigation";
import { shallowEqual, useSelector } from "react-redux";
import { selectValues } from "../../redux/profileReducer";

type Props = {
  message: IMessage;
  viewDate: boolean;
};

export const dateViewer = (date: string) => {
  const now = new Date(Date.now()).getTime();
  const d = new Date(date).getTime();
  const diff = Math.floor((now - d) / 1000);

  if (diff < 86400) {
    let hours: string | number = Math.floor(diff / 3600);
    hours = hours < 10 ? `0${hours}` : hours;
    const minutes = Math.floor((diff % 3600) / 60);
    const result = hours + ":" + (minutes < 10 ? "0" : "") + minutes;
    return result;
  } else if (diff < 604800) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const result = daysOfWeek[new Date(date).getDay()];
    return result;
  } else if (diff < 31536000) {
    const day = new Date(date).getDate();
    const month = new Date(date).toLocaleString("default", { month: "long" });
    const result = day + " " + month;
    return result;
  }
  const year = new Date(date).getFullYear();
  const month = new Date(date).toLocaleString("default", { month: "long" });
  const day = new Date(date).getDate();
  const result = day + " " + month + " " + year;
  return result;
};

const MessageItem: FC<Props> = ({ message, viewDate }) => {
  const { type, content, reply, created, username, pp, id } = message;
  const { username: myusername } = useSelector(selectValues, shallowEqual);
  const box = useMemo(() => {
    if (type == 0) {
      return <p>{content}</p>;
    } else if (type == 1) {
      return (
        <img
          onClick={disableRightClick}
          src={content}
          alt={`message-alt-${id}`}
        />
      );
    } else if (type == 2) {
      return (
        <div className="post">
          <div className="up"></div>
        </div>
      );
    } else {
      return <div className="reply"></div>;
    }
  }, []);

  const usermessage = myusername == username;
  const date = useMemo(() => dateViewer(created), []);

  return (
    <>
      {viewDate && (
        <div className="view-date">
          <p className="date">{date}</p>
        </div>
      )}
      <Container className={usermessage ? "" : "mm"}>
        {usermessage && (
          <div className="pp">
            <img src={pp || "/pp.jpg"} alt="pp" />
          </div>
        )}
        <div className="box">{box}</div>
      </Container>
    </>
  );
};

const Container = styled.li`
  width: 100%;
  display: flex;
  height: 4rem;
  &.mm {
    flex-direction: row-reverse;
  }
  .pp {
    width: 2rem;
    height: 2rem;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }
`;

export default MessageItem;
