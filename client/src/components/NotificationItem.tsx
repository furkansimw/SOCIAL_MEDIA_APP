import React from "react";
import { INotification } from "../interfaces/ISlices";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NotificationItem = ({ n }: { n: INotification }) => {
  const { created, id, pp, targeturl, type, username } = n;

  return (
    <Container key={id}>
      <Link to={targeturl}></Link>
    </Container>
  );
};

const Container = styled.li``;

export default NotificationItem;
