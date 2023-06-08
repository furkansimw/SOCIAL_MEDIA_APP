"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const styled_components_1 = __importDefault(require("styled-components"));
const TextArea_1 = __importDefault(require("./TextArea"));
const react_2 = require("swiper/react");
require("swiper/css");
require("swiper/css/pagination");
require("swiper/css/navigation");
// @ts-ignore
const swiper_1 = require("swiper");
const Icons_1 = require("../Icons");
const SortImages_1 = __importDefault(require("./SortImages"));
const CreatePostPopupImages = ({ extraPick, textAreaIsActive, text, setText, images, setImages, }) => {
    const [sortImagesPopup, setSortImagesPopup] = (0, react_1.useState)(false);
    const btnRef = (0, react_1.useRef)(null), sortImagesRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const worker = (e) => {
            if (!(btnRef.current && sortImagesRef.current))
                return;
            const l = e.composedPath();
            if (l.includes(btnRef.current) || l.includes(sortImagesRef.current)) {
                if (l.includes(btnRef.current))
                    setSortImagesPopup(!sortImagesPopup);
            }
            else
                setSortImagesPopup(false);
        };
        window.addEventListener("click", worker);
        return () => {
            window.removeEventListener("click", worker);
        };
    }, [sortImagesPopup]);
    return (<Container>
      <react_2.Swiper slidesPerView={1} pagination={{
            clickable: true,
        }} navigation={true} modules={[swiper_1.Pagination, swiper_1.Navigation]} className="mySwiper">
        {images.map((img) => {
            return (<react_2.SwiperSlide>
              <img src={img.src} alt={img.index}/>
              <div className="layer"></div>
            </react_2.SwiperSlide>);
        })}
        {!textAreaIsActive && (<>
            <SortImages_1.default ref={sortImagesRef} images={images} setImages={setImages} extraPick={extraPick} isActive={sortImagesPopup}/>
            <button ref={btnRef} className="moreiconimages">
              <Icons_1.MoreIconImages />
            </button>
          </>)}
      </react_2.Swiper>
      <TextArea_1.default textAreaIsActive={textAreaIsActive} text={text} setText={setText}/>
    </Container>);
};
const Container = styled_components_1.default.div `
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
exports.default = CreatePostPopupImages;
