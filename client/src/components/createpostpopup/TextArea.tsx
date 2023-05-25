import React, { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectProfileValues } from "../../redux/profileSlice";

type Props = {
  textAreaIsActive: boolean;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
};

const TextArea: FC<Props> = ({ textAreaIsActive, text, setText }) => {
  const { username, pp } = useSelector(selectProfileValues);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);

  return (
    <Container className={textAreaIsActive ? "active" : ""}>
      <div className="info">
        <img src={pp || "/pp.jpg"} alt="pp" />
        <p>{username}</p>
      </div>
      <textarea
        value={text}
        onChange={onChange}
        maxLength={1000}
        placeholder="Write a caption..."
      ></textarea>
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
  transition: 0.2s ease all;
  width: 0px;
  max-width: 400px;
  padding: 0px;
  min-width: 300px;
  &.active {
    padding: 1rem;
    width: 100%;
  }
`;

export default TextArea;
