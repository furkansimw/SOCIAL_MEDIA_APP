import { createAction, getImages } from "../../../api/posts";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { selectCurrentPost } from "../../../redux/postsReducer";
import { AppDispatch } from "../../../redux/store";
import { memo, useEffect, useState } from "react";
//@ts-ignore
import { Pagination, Navigation } from "swiper";
import {
  selectIsLoggedin,
  toggleSetLoginPopupActive,
} from "../../../redux/profileReducer";

const PostPopupImages = () => {
  const dispach = useDispatch<AppDispatch>();

  const cp = useSelector(selectCurrentPost, shallowEqual)!;

  useEffect(() => {
    if (cp.page != "page") {
      if (more && !images) dispach(getImages(id));
    }
  }, [cp]);

  const [likeA, setLikeA] = useState(false);

  const { images, cover, more, id, isliked, owner: postowner } = cp;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLikeA(false);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [likeA]);
  const isloggedin = useSelector(selectIsLoggedin, shallowEqual);
  const dc = () => {
    if (!isloggedin) return dispach(toggleSetLoginPopupActive());
    setLikeA(true);
    if (isliked) return;
    dispach(createAction({ a: true, t: "like", postid: id, postowner }));
  };

  if (!images)
    return (
      <div className="cvr" onDoubleClick={dc}>
        <img className="cover" src={cover} alt="cover" />
        <div className="layer"></div>
        <div className={`like-a ${likeA ? `a` : ``}`}></div>
      </div>
    );

  return (
    <div className="images" onDoubleClick={dc}>
      <Swiper
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {images.map((img, index) => {
          return (
            <SwiperSlide>
              <img src={img} alt={index.toString()} />
              <div className="layer"></div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className={`like-a ${likeA ? `a` : ``}`}></div>
    </div>
  );
};

export default memo(PostPopupImages);
