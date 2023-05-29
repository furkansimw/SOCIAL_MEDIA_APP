import { createAction, getImages } from "../api/posts";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { selectCurrentPost } from "../redux/postsReducer";
import { AppDispatch } from "../redux/store";
import { useEffect, useState } from "react";
//@ts-ignore
import { Pagination, Navigation } from "swiper";

const PostPopupImages = () => {
  const dispach = useDispatch<AppDispatch>();

  const cp = useSelector(selectCurrentPost, shallowEqual)!;

  useEffect(() => {
    if (more && !images) dispach(getImages(id));
  }, [cp]);

  const [likeA, setLikeA] = useState(false);

  const { images, cover, more, id, isliked } = cp;

  useEffect(() => {
    if (!isliked) dispach(createAction({ a: true, t: "like", postid: id }));
    const timeout = setTimeout(() => {
      setLikeA(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [likeA]);

  if (!images)
    return (
      <div className="cvr" onDoubleClick={() => setLikeA(true)}>
        <img className="cover" src={cover} alt="cover" />
        <div className="layer"></div>
        <div className={`like-a ${likeA ? `a` : ``}`}></div>
      </div>
    );

  return (
    <div className="images" onDoubleClick={() => setLikeA(true)}>
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

export default PostPopupImages;
