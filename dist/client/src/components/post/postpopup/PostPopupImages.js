"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const posts_1 = require("../../../api/posts");
const react_redux_1 = require("react-redux");
const react_1 = require("swiper/react");
const postsReducer_1 = require("../../../redux/postsReducer");
const react_2 = require("react");
//@ts-ignore
const swiper_1 = require("swiper");
const PostPopupImages = () => {
    const dispach = (0, react_redux_1.useDispatch)();
    const cp = (0, react_redux_1.useSelector)(postsReducer_1.selectCurrentPost, react_redux_1.shallowEqual);
    (0, react_2.useEffect)(() => {
        if (more && !images)
            dispach((0, posts_1.getImages)(id));
    }, [cp]);
    const [likeA, setLikeA] = (0, react_2.useState)(false);
    const { images, cover, more, id, isliked } = cp;
    (0, react_2.useEffect)(() => {
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
        dispach((0, posts_1.createAction)({ a: true, t: "like", postid: id }));
    };
    if (!images)
        return (<div className="cvr" onDoubleClick={dc}>
        <img className="cover" src={cover} alt="cover"/>
        <div className="layer"></div>
        <div className={`like-a ${likeA ? `a` : ``}`}></div>
      </div>);
    return (<div className="images" onDoubleClick={dc}>
      <react_1.Swiper slidesPerView={1} pagination={{
            clickable: true,
        }} navigation={true} modules={[swiper_1.Pagination, swiper_1.Navigation]} className="mySwiper">
        {images.map((img, index) => {
            return (<react_1.SwiperSlide>
              <img src={img} alt={index.toString()}/>
              <div className="layer"></div>
            </react_1.SwiperSlide>);
        })}
      </react_1.Swiper>
      <div className={`like-a ${likeA ? `a` : ``}`}></div>
    </div>);
};
exports.default = PostPopupImages;
