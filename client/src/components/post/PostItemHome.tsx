import { FC, MouseEvent, useEffect, useMemo, useState } from "react";
import { IPost } from "../../interfaces/ISlices";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
//@ts-ignore
import { Pagination, Navigation } from "swiper";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { createAction } from "../../api/posts";
import { Link } from "react-router-dom";
import {
  CommentIcon,
  LikeIcon,
  MoreIcon,
  MoreIcon2,
  SaveIcon,
  ShareIcon,
} from "../Icons";
import { disableRightClick } from "../Navigation";
import Bottom, { dateCalc } from "./postpopup/Bottom";
import Likes from "./postpopup/Likes";
import { setBack, setCurrentPostId } from "../../redux/postsReducer";
import LinkConverter from "./LinkConverter";

type props = {
  post: IPost;
};

const PostItemHome: FC<props> = ({ post }) => {
  const {
    images,
    isliked,
    id: postid,
    username,
    pp,
    content,
    issaved,
    likecount,
    created,
  } = post;
  const dispatch = useDispatch<AppDispatch>();
  const [likeA, setLikeA] = useState(false);

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
    dispatch(createAction({ a: true, t: "like", postid }));
  };
  const like = () => dispatch(createAction({ a: !isliked, postid, t: "like" }));
  const [likesPopup, setLikesPopup] = useState(false);
  const quit = () => setLikesPopup(false);
  const viewLikes = () => setLikesPopup(true);
  const save = () => dispatch(createAction({ a: !issaved, postid, t: "save" }));
  const date = useMemo(() => dateCalc(created).replace("ago", ""), []);
  const viewComment = () => {
    window.history.pushState(null, "", `/p/${postid}`);
    dispatch(setBack("home"));
    dispatch(setCurrentPostId(postid));
  };
  return (
    <Container>
      <div className="info-s">
        <div className="left">
          <Link className="pp" to={`/${username}`}>
            <img
              onContextMenu={disableRightClick}
              src={pp || "/pp.jpg"}
              alt="pp"
            />
          </Link>
          <Link className="username" to={`/${username}`}>
            {username}
          </Link>
          <p className="date"> • {date}</p>
        </div>
        <div className="right">
          <button>
            <MoreIcon2 />
          </button>
        </div>
      </div>
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
          {images?.map((img, index) => {
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
      <div className="bottom">
        <div className="icons">
          <div className="l">
            <button
              className={`like ${isliked ? "active" : ``}`}
              onClick={like}
            >
              <LikeIcon isactive={isliked} />
            </button>
            <button onClick={viewComment} className="comment">
              <CommentIcon />
            </button>
            {likesPopup && <Likes type="post" quit={quit} postid={postid} />}
            <button>
              <ShareIcon />
            </button>
          </div>
          <button onClick={save} className={`save ${issaved ? "active" : ``}`}>
            <SaveIcon isactive={issaved} />
          </button>
        </div>
        <div className="detail">
          <p onClick={viewLikes} className="likecount">
            {likecount.toLocaleString()} likes
          </p>
        </div>
        <pre>
          <Link className="username" to={`/${username}`}>
            {username}
          </Link>
          {content && <LinkConverter text={content} />}
        </pre>
      </div>
    </Container>
  );
};

const Container = styled.li`
  width: 100%;
  max-width: 500px;
  margin-top: 1rem;
  height: 100%;
  position: relative;
  border-top: 1px solid #262626;
  @media (max-width: 669px) {
    width: calc(100% - 2rem) !important;
  }
  .info-s {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    height: 58px;
    padding: 0px 6px;
    border-bottom: 1px solid #262626;
    .left {
      display: flex;
      align-items: center;
      .pp {
        width: 2rem;
        height: 2rem;
        margin-right: 10px;
        img {
          width: 2rem;
          height: 2rem;
          border-radius: 100%;
        }
      }
      .username {
        font-size: 14px;
        font-weight: 600;
        margin-right: 6px;
        &:hover {
          opacity: 0.7;
        }
      }
      .date {
        color: #a8a8a8;
        font-size: 14px;
        line-height: 18px;
      }
    }
    .right {
      button {
        &:hover {
          opacity: 0.7;
        }
        svg {
          fill: #fafafa;
        }
      }
    }
  }
  .images,
  .swiper-slide,
  .swiper,
  .swiper-wrapper {
    height: 100%;
    position: relative;
    width: 100%;
    max-height: 500px;
    img {
      width: 100%;
      height: 100%;
      max-height: 500px;
      object-fit: cover;
    }
    .layer {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0px;
      top: 0px;
    }
  }
  .like-a {
    position: absolute;
    left: calc(50% - 64px);
    z-index: 10;
    top: calc(50% - 64px);
    background-image: url("/bg.png");
    background-repeat: no-repeat;
    background-position: 0 0;
    height: 128px;
    width: 128px;
    opacity: 0;
    &.a {
      @keyframes scsx {
        0% {
          opacity: 0;
          transform: scale(0);
        }
        15% {
          opacity: 0.9;
          transform: scale(1.2);
        }
        30% {
          transform: scale(0.95);
        }
        45%,
        80% {
          opacity: 0.9;
          transform: scale(1);
        }
        100% {
          opacity: 0;
          transform: scale(0);
        }
      }
      animation: 1s scsx ease-in-out;
    }
  }
  .icons {
    display: flex;
    padding: 6px 1rem 6px 0px;
    button {
      &:first-child {
        padding-left: 0px;
      }
      &:hover {
        &.active {
          opacity: 1 !important;
        }
        opacity: 0.7;
      }
      background-color: transparent;
      padding: 6px;
      position: relative;

      &.like {
        svg {
          transform: scale(1);
        }
        &.active {
          svg {
            @keyframes likep {
              0% {
                transform: scale(1);
              }
              25% {
                transform: scale(1.2);
              }
              50% {
                transform: scale(0.95);
              }
              100% {
                transform: scale(1);
              }
            }
            animation: likep 0.45s ease-in-out;
          }
        }
      }
      &.save {
        padding-right: 0px;
      }
    }
    .l {
      display: flex;
      width: 100%;
    }
  }
  .detail {
    padding: 0px 1rem 0px 0px;
    margin-bottom: 8px;
    p {
      font-size: 14px;
      line-height: 18px;
      font-weight: 500;
      cursor: pointer;
      &.date {
        user-select: none;
        cursor: default;
        font-size: 12px;
        line-height: 14px;
        color: #a8a8a8;
        font-weight: 400;
      }
      &.likecount {
        font-weight: 600;
      }
    }
  }
  pre {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    font-size: 14px;
    line-height: 18px;
    word-wrap: break-word;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    display: block;
    .username {
      margin-right: 4px;
    }
    a {
      display: inline;
    }
  }
`;

export default PostItemHome;
