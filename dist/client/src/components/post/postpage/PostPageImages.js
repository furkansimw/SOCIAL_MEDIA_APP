"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const PostPageImages = () => {
    const dc = () => { };
    useEffect(() => {
        const timeout = setTimeout(() => {
            setLikeA(false);
        }, 1000);
        return () => {
            clearTimeout(timeout);
        };
    }, [likeA]);
    const dc = () => {
        setLikeA(true);
        if (isliked)
            return;
        dispach(createAction({ a: true, t: "like", postid: id, postowner }));
    };
    return (<div className="images" onDoubleClick={dc}>
      <Swiper slidesPerView={1} pagination={{
            clickable: true,
        }} navigation={true} modules={[Pagination, Navigation]} className="mySwiper">
        {images.map((img, index) => {
            return (<SwiperSlide>
              <img src={img} alt={index.toString()}/>
              <div className="layer"></div>
            </SwiperSlide>);
        })}
      </Swiper>
      <div className={`like-a ${likeA ? `a` : ``}`}></div>
    </div>);
};
exports.default = PostPageImages;
