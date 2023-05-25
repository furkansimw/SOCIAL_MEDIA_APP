import React, { ChangeEvent, FC, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import TextArea from "./TextArea";

type Props = {
  extraPick: (e: ChangeEvent<HTMLInputElement>) => void;
  textAreaIsActive: boolean;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
};

const CreatePostPopupImages: FC<Props> = ({
  extraPick,
  textAreaIsActive,
  text,
  setText,
}) => {
  return (
    <Container>
      <h1>Create PostPopupImages</h1>
      {textAreaIsActive && <TextArea text={text} setText={setText} />}
    </Container>
  );
};

const Container = styled.div``;

export default CreatePostPopupImages;
