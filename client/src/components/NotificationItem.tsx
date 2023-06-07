import { INotification } from "../interfaces/ISlices";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { dateCalc } from "./post/postpopup/Bottom";
import { MouseEvent } from "react";

const NotificationItem = ({
  n,
  closepanel,
}: {
  n: INotification;
  closepanel: () => void;
}) => {
  const { id, targeturl, owner, pp, username, created, type, status } = n;

  const text = useMemo(() => ["started following you. "][type], []);
  const date = useMemo(() => dateCalc(created), []);
  const s = useMemo(() => {
    if (type == null) return "Follow";
    if (type == 0) return "Requested";
    if (type == 1) return "Following";
    return "";
  }, [status]);
  const onc = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
  };
  return (
    <Container key={id}>
      <Link to={targeturl} onClick={closepanel}>
        <img className="pp" src={pp || "/pp.jpg"} alt="pp" />
        <pre className="text">
          <Link to={`/${username}`}>{username}</Link>
          {text}
          <span>{date}</span>{" "}
        </pre>
        <button className={s} onClick={onc}>
          {s}
        </button>
      </Link>
    </Container>
  );
};

const Container = styled.li`
  white-space: nowrap;
  width: 100%;

  a {
    display: flex;
    padding: 8px 24px;
    align-items: center;
    width: 100%;
    .pp {
      width: 44px;
      height: 44px;
      border-radius: 100%;
      margin-right: 14px;
    }
    .text {
      width: 100%;
      white-space: pre-wrap;
      font-size: 14px;
      max-lines: 2;
      height: 36px;
      line-height: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      a {
        font-weight: 600;
        padding: 0px;
        display: inline-block;
        margin-right: 4px;
        width: min-content;
      }
      span {
        color: #a8a8a8;
        font-size: 12px;
      }
    }
    button {
      font-size: 14px;
      border-radius: 8px;
      padding: 7px 1rem;
      background-color: #fafafa;
      color: #000;
      margin-left: 10px;
      &.Follow {
        background-color: #0095f6;
        color: #fafafa;
      }
    }
  }
`;

export default NotificationItem;
