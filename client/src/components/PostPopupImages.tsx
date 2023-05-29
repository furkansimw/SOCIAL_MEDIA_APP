import { getImages } from "../api/posts";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { selectCurrentPost } from "../redux/postsReducer";
import { AppDispatch } from "../redux/store";
import { useEffect } from "react";
//@ts-ignore
import { Pagination, Navigation } from "swiper";

const PostPopupImages = () => {
  const dispach = useDispatch<AppDispatch>();

  const cp = useSelector(selectCurrentPost, shallowEqual)!;

  useEffect(() => {
    if (more && !images) dispach(getImages(id));
  }, [cp]);

  const { images, cover, more, id } = cp;

  if (!images)
    return (
      <div className="cvr">
        <img className="cover" src={cover} alt="cover" />
        <div className="layer"></div>
      </div>
    );

  return (
    <div className="images">
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
    </div>
  );
};

export default PostPopupImages;
