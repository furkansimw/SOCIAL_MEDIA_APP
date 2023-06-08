import React from "react";

const PostPageImages = () => {
  const dc = () => {};

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
    if (isliked) return;
    dispach(createAction({ a: true, t: "like", postid: id, postowner }));
  };

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

export default PostPageImages;
