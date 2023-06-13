import { FC, memo, useMemo } from "react";
import { IMessage } from "../../interfaces/IMessages";
import { styled } from "styled-components";
import { disableRightClick } from "../navigation/Navigation";
import { shallowEqual, useSelector } from "react-redux";
import { selectValues } from "../../redux/profileReducer";

type Props = {
  message: IMessage;
  viewDate: boolean;
  base: string;
};

export const dateViewer = (date: string) => {
  const now = new Date(Date.now()).getTime();
  const d = new Date(date).getTime();
  const diff = Math.floor((now - d) / 1000);
  const diffD = diff / 60 / 60 / 24;
  if (diffD < 1) {
    let hour: any = new Date(d).getHours();
    let min: any = new Date(d).getMinutes();
    hour = hour < 10 ? `0${hour}` : hour;
    min = min < 10 ? `0${min}` : min;
    return `${hour}:${min}`;
  }
  if (diffD > 1 && diffD < 7) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let hour: any = new Date(d).getHours();
    let min: any = new Date(d).getMinutes();
    hour = hour < 10 ? `0${hour}` : hour;
    min = min < 10 ? `0${min}` : min;
    const day = days[new Date(d).getDay()];
    return `${day} ${hour}:${min}`;
  }
  const d1 = new Date(d).getFullYear();
  const d2 = new Date(now).getFullYear();
  let year = "";
  if (d1 != d2) year = "- " + d1.toString();

  return `${
    new Date(d).getDate() < 10
      ? `0${new Date(d).getDate()}`
      : new Date(d).getDate()
  } - ${
    new Date(d).getMonth() < 10
      ? `0${new Date(d).getMonth()}`
      : new Date(d).getMonth() + 1
  } ${year}`;
};

const MessageItem: FC<Props> = ({ message, viewDate, base }) => {
  const { type, content, reply, created, username, pp, id } = message;
  const { username: myusername } = useSelector(selectValues, shallowEqual);
  const box = useMemo(() => {
    if (type == 0) {
      return <p className={base}>{content}</p>;
    } else if (type == 1) {
      return (
        <div className="sended-img">
          <img
            onContextMenu={disableRightClick}
            src={content}
            alt={`message-alt-${id}`}
          />
        </div>
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
  }, [base]);

  const usermessage = myusername != username;
  const date = useMemo(() => dateViewer(created), [created]);

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
  padding: 0px 1rem;
  margin: 2px 0px;
  &.mm {
    justify-content: end;
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
  .sended-img {
    max-width: 350px;
    max-height: 350px;
    width: calc(50vw - 200px);
    min-width: 200px;
    aspect-ratio: 1;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  p {
    @media screen and (max-width: 895px) {
      max-width: calc(50vw - 50px);
    }
    min-width: 0px;
    width: min-content;
    max-width: 350px;
    white-space: pre-wrap;
    word-wrap: break-word;
    background-color: #3797f0;
    font-size: 15px;
    line-height: 18px;
    padding: 7px 12px;
    &.first {
      border-radius: 1rem 1rem 0px 1rem;
    }
    &.middle {
      border-radius: 1rem 0px 0px 1rem;
    }
    &.last {
      border-radius: 1rem 0px 1rem 1rem;
    }
    &.single {
      border-radius: 1rem;
    }
  }
`;

export default memo(MessageItem);
