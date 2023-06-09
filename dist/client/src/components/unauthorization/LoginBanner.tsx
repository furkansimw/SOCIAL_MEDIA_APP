import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch } from "../../redux/store";
import { toggleSetLoginPopupActive } from "../../redux/profileReducer";
import { memo } from "react";

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
  justify-content: center;
  display: flex;
  position: absolute;
  align-items: center;
  bottom: 0rem;
  z-index: 5560;
  .content {
    border-radius: 22px 22px 0px 0px;
    padding: 2rem;
    background-color: #000;
    max-width: 940px;
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

export default memo(LoginBanner);
