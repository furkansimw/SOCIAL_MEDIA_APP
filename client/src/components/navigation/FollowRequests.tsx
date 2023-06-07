import React, { FC } from "react";
import styled from "styled-components";

type Props = {
  isActive: boolean;
};

const FollowRequests: FC<Props> = ({ isActive }) => {
  return (
    <Container className={isActive ? "a" : ""}>
      <h1>Fr</h1>
    </Container>
  );
};

const Container = styled.ul`
  width: 100%;
  overflow: hidden;
  height: 100%;
  overflow-y: auto;
  background-color: red;
  transition: 0.3s ease-in-out all;
`;

export default FollowRequests;
