import React, { forwardRef } from "react";
import styled from "styled-components";

type Props = {
  isActive: boolean;
};

const NotificationsPanel = forwardRef<HTMLDivElement, Props>(
  ({ isActive }: Props, ref) => {
    return (
      <Container className={isActive ? "active" : ""} ref={ref}>
        <h1>Search Panel</h1>
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
  border-right: 1px solid #262626;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
  border-radius: 0px 1rem 1rem 0px;
  &.active {
    left: 0px;
  }
`;

export default NotificationsPanel;
