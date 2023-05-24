import React, { forwardRef } from "react";
import styled from "styled-components";

type Props = {
  isActive: boolean;
};

const NotificationsPanel = forwardRef<HTMLDivElement, Props>(
  ({ isActive }: Props, ref) => {
    return (
      <Container className={isActive ? "active" : ""} ref={ref}>
        <h1>Notifications Panel</h1>
      </Container>
    );
  }
);

const Container = styled.div`
  position: absolute;
  width: 400px;
  height: 100vh;
  left: -400px;
  top: 0px;
  background-color: #000;
  transition: 0.3s ease-in-out all;
  padding-left: 73px;
  &.active {
    left: 0px;
  }
`;

export default NotificationsPanel;
