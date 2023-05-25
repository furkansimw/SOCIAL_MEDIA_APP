import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  forwardRef,
} from "react";
import { IPickImage } from "./CreatePostPopup";
import styled from "styled-components";

type Props = {
  extraPick: (e: ChangeEvent<HTMLInputElement>) => void;
  images: IPickImage[];
  setImages: Dispatch<SetStateAction<IPickImage[]>>;
  isActive: boolean;
};

const SortImages = forwardRef<HTMLDivElement, Props>(
  ({ extraPick, images, setImages, isActive }, ref) => {
    const sort = () => {
      // todo
    };

    return (
      <Container ref={ref} className={isActive ? "active" : ""}>
        {images.map((img) => {
          return <img src={img.src} />;
        })}
      </Container>
    );
  }
);

const Container = styled.div`
  position: absolute;
  bottom: 4rem;
  right: 4rem;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  overflow: hidden;
  transform-origin: bottom right;
  transition: 0.3s ease-in-out all;
  height: 100px;
  width: calc(100% - 6rem);
  padding: 10px;
  padding-right: 0px;
  transform: scale(0);
  &.active {
    transform: scale(1);
  }
  img {
    margin-right: 10px;
    width: 80px;
    height: 80px;
    cursor: pointer;
    object-fit: cover;
  }
`;

export default SortImages;
