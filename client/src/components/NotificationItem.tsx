import { INotification } from "../interfaces/ISlices";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useMemo } from "react";

const NotificationItem = ({ n }: { n: INotification }) => {
  const { id, targeturl, owner, pp, username, created, type } = n;

  // const text = useMemo(()=>['F'], []);

  return (
    <Container key={id}>
      <Link to={targeturl}>
        <img className="pp" src={pp || "/pp.jpg"} alt="pp" />
        <pre className="text">
          <Link to={`/${username}`}>{username}</Link>
          {type}
        </pre>
      </Link>
    </Container>
  );
};

const Container = styled.li`
  white-space: nowrap;
  a {
    display: flex;
    .pp {
      width: 44px;
      height: 44px;
      border-radius: 100%;
      margin-right: 14px;
    }
    .text {
    }
  }
`;

export default NotificationItem;
