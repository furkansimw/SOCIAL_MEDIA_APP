import React, { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectProfileValues } from "../../redux/profileSlice";

type Props = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
};

const TextArea: FC<Props> = ({ text, setText }) => {
  const { username, pp } = useSelector(selectProfileValues);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value);

  return (
    <Container>
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

const Container = styled.div``;

export default TextArea;
