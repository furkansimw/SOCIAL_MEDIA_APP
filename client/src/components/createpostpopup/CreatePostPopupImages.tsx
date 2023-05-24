import React, { ChangeEvent, FC } from "react";
import styled from "styled-components";
import TextArea from "./TextArea";

type Props = {
  extraPick: (e: ChangeEvent<HTMLInputElement>) => void;
  textAreaIsActive: boolean;
};

const CreatePostPopupImages: FC<Props> = ({ extraPick, textAreaIsActive }) => {
  return (
    <Container>
      <h1>Create PostPopupImages</h1>
      {textAreaIsActive && <TextArea />}
    </Container>
  );
};

const Container = styled.div``;

export default CreatePostPopupImages;
