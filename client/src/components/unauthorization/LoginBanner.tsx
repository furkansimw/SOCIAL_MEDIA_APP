import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch } from "../../redux/store";
import { toggleSetLoginPopupActive } from "../../redux/profileReducer";

const LoginBanner = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tap = () => dispatch(toggleSetLoginPopupActive());
  return (
    <Container>
      <div className="content">
        <h1>Social Media App</h1>
        <button onClick={tap}>Login</button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin: 2rem 0px 1rem;
  justify-content: center;
  display: flex;
  width: 100%;
  .content {
    max-width: 900px;
    padding: 0px 2rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    h1 {
      font-size: 24px;
      font-weight: 600;
    }
    button {
      padding: 7px 1rem;
      border-radius: 8px;
      color: #fafafa;
      font-size: 14px;
      cursor: pointer;
      background-color: #0095f6;
      &:hover {
        opacity: 0.7;
      }
    }
  }
`;

export default LoginBanner;
