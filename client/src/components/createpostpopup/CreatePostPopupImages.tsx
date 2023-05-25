import {
  ChangeEvent,
  FC,
  Dispatch,
  SetStateAction,
  useState,
  useRef,
  useEffect,
} from "react";
import styled from "styled-components";
import TextArea from "./TextArea";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// @ts-ignore
import { Pagination, Navigation } from "swiper";
import { IPickImage } from "./CreatePostPopup";
import { MoreIconImages } from "../Icons";
import SortImages from "./SortImages";

type Props = {
  extraPick: (e: ChangeEvent<HTMLInputElement>) => void;
  images: IPickImage[];
  textAreaIsActive: boolean;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  setImages: Dispatch<SetStateAction<IPickImage[]>>;
};

const CreatePostPopupImages: FC<Props> = ({
  extraPick,
  textAreaIsActive,
  text,
  setText,
  images,
  setImages,
}) => {
  const [sortImagesPopup, setSortImagesPopup] = useState(false);

  const btnRef = useRef<HTMLButtonElement>(null),
    sortImagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const worker = (e: MouseEvent) => {
      if (!(btnRef.current && sortImagesRef.current)) return;
      const l = e.composedPath();
      if (l.includes(btnRef.current) || l.includes(sortImagesRef.current)) {
        if (l.includes(btnRef.current)) setSortImagesPopup(!sortImagesPopup);
      } else setSortImagesPopup(false);
    };

    window.addEventListener("click", worker);

    return () => {
      window.removeEventListener("click", worker);
    };
  }, [sortImagesPopup]);

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
        {!textAreaIsActive && (
          <>
            <SortImages
              ref={sortImagesRef}
              images={images}
              setImages={setImages}
              extraPick={extraPick}
              isActive={sortImagesPopup}
            />
            <button ref={btnRef} className="moreiconimages">
              <MoreIconImages />
            </button>
          </>
        )}
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
      .layer {
        left: 0px;
        top: 0px;
        width: 100%;
        position: absolute;
        height: 100%;
      }
    }
    .moreiconimages {
      position: absolute;
      right: 20px;
      bottom: 20px;
      z-index: 10;
      padding: 8px;
      width: 36px;
      height: 36px;
      border-radius: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      border: none;
      outline: none;
    }
  }
`;

export default CreatePostPopupImages;
