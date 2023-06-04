import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFound = () => {
  return (
    <Container>
      <h1>Sorry, this page isn't available.</h1>
      <Link to={"/"}>
        The link you followed may be broken, or the page may have been removed.
        Go back to <span>Home</span>.
      </Link>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    margin: 1rem;
    font-size: 24px;
  }
  span {
    font-weight: 600;
    color: #e0f1ff;
  }
`;

export default NotFound;
