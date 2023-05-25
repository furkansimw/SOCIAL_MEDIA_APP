import React, { ChangeEvent, FC, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import TextArea from "./TextArea";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// @ts-ignore
import { Pagination, Navigation } from "swiper";
import { IPickImage } from "./CreatePostPopup";

type Props = {
  extraPick: (e: ChangeEvent<HTMLInputElement>) => void;
  images: IPickImage[];
  textAreaIsActive: boolean;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
};

const CreatePostPopupImages: FC<Props> = ({
  extraPick,
  textAreaIsActive,
  text,
  setText,
  images,
}) => {
  return (
    <Container>
      <Swiper
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {images.map((img) => {
          return (
            <SwiperSlide>
              <img src={img.src} alt={img.index} />
              <div className="layer"></div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <TextArea
        textAreaIsActive={textAreaIsActive}
        text={text}
        setText={setText}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1100px;
  .mySwiper {
    width: 100%;
    height: 100%;
    position: relative;
    min-width: 700px;
    @media screen and (max-width: 1228px) {
      min-width: 0px;
      width: 100%;
    }
    .swiper-slide {
      width: 100%;
      height: 100%;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;

export default CreatePostPopupImages;
