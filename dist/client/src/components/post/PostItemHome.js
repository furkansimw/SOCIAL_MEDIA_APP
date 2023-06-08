"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const styled_components_1 = __importDefault(require("styled-components"));
const react_2 = require("swiper/react");
//@ts-ignore
const swiper_1 = require("swiper");
const react_redux_1 = require("react-redux");
const posts_1 = require("../../api/posts");
const react_router_dom_1 = require("react-router-dom");
const Icons_1 = require("../Icons");
const Navigation_1 = require("../navigation/Navigation");
const Bottom_1 = require("./postpopup/Bottom");
const Likes_1 = __importDefault(require("./postpopup/Likes"));
const postsReducer_1 = require("../../redux/postsReducer");
const LinkConverter_1 = __importDefault(require("./LinkConverter"));
const Context_1 = __importDefault(require("./Context"));
const PostItemHome = ({ post }) => {
    const [m, _m] = (0, react_1.useState)(false);
    const { images, isliked, id: postid, username, pp, content, issaved, likecount, created, commentcount, owner: postowner, } = post;
    const dispatch = (0, react_redux_1.useDispatch)();
    const [likeA, setLikeA] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
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
        dispatch((0, posts_1.createAction)({ a: true, t: "like", postid, postowner }));
    };
    const like = () => dispatch((0, posts_1.createAction)({ a: !isliked, postid, t: "like", postowner }));
    const [likesPopup, setLikesPopup] = (0, react_1.useState)(false);
    const quit = () => setLikesPopup(false);
    const viewLikes = () => setLikesPopup(true);
    const save = () => dispatch((0, posts_1.createAction)({ a: !issaved, postid, t: "save", postowner }));
    const date = (0, react_1.useMemo)(() => (0, Bottom_1.dateCalc)(created).replace("ago", ""), []);
    const viewComment = () => {
        window.history.replaceState(null, "", `/p/${postid}`);
        dispatch((0, postsReducer_1.setBack)("home"));
        dispatch((0, postsReducer_1.setCurrentPostId)(postid));
    };
    const contentRef = (0, react_1.useRef)(null);
    (0, react_1.useLayoutEffect)(() => {
        if (contentRef.current)
            setIsOverflow(contentRef.current.scrollHeight > 36);
    }, []);
    const [more, setMore] = (0, react_1.useState)(false);
    const [isOverflow, setIsOverflow] = (0, react_1.useState)(false);
    return (<Container className="homelistitem">
      <div className="info-s">
        <div className="left">
          <react_router_dom_1.Link className="pp" to={`/${username}`}>
            <img onContextMenu={Navigation_1.disableRightClick} src={pp || "/pp.jpg"} alt="pp"/>
          </react_router_dom_1.Link>
          <react_router_dom_1.Link className="username" to={`/${username}`}>
            {username}
          </react_router_dom_1.Link>
          <p className="date"> • {date}</p>
        </div>
        <div className="right">
          <button onClick={() => _m(true)}>
            <Icons_1.MoreIcon2 />
          </button>
        </div>
      </div>
      <div className="images" onDoubleClick={dc}>
        <react_2.Swiper slidesPerView={1} pagination={{
            clickable: true,
        }} navigation={true} modules={[swiper_1.Pagination, swiper_1.Navigation]} className="mySwiper">
          {images === null || images === void 0 ? void 0 : images.map((img, index) => {
            return (<react_2.SwiperSlide>
                <img src={img} alt={index.toString()}/>
                <div className="layer"></div>
              </react_2.SwiperSlide>);
        })}
        </react_2.Swiper>
        <div className={`like-a ${likeA ? `a` : ``}`}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <div className="l">
            <button className={`like ${isliked ? "active" : ``}`} onClick={like}>
              <Icons_1.LikeIcon isactive={isliked}/>
            </button>
            <button onClick={viewComment} className="comment">
              <Icons_1.CommentIcon />
            </button>
            {likesPopup && <Likes_1.default type="post" quit={quit} postid={postid}/>}
            <button>
              <Icons_1.ShareIcon />
            </button>
          </div>
          <button onClick={save} className={`save ${issaved ? "active" : ``}`}>
            <Icons_1.SaveIcon isactive={issaved}/>
          </button>
        </div>
        <div className="detail">
          <p onClick={viewLikes} className="likecount">
            {likecount.toLocaleString()} likes
          </p>
        </div>
        <pre ref={contentRef} className={`${!more ? (isOverflow ? `o` : ``) : ``}`}>
          <react_router_dom_1.Link className="username" to={`/${username}`}>
            {username}
          </react_router_dom_1.Link>
          {content && <LinkConverter_1.default text={content}/>}
        </pre>
        {isOverflow && !more && (<button className="more" onClick={() => setMore(true)}>
            more
          </button>)}
        {commentcount > 0 && (<p className="viewc" onClick={viewComment}>
            View all {commentcount} comments
          </p>)}
      </div>
      {m && <Context_1.default close={() => _m(false)} post={post}/>}
    </Container>);
};
const Container = styled_components_1.default.li `
  width: 100%;
  max-width: 500px;
  margin: 1rem 0px;
  height: calc(100% + 24px);
  position: relative;
  border-top: 1px solid #262626;
  @media (max-width: 669px) {
    width: calc(100% - 2rem) !important;
  }
  .info-s {
    min-height: 58px;
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
    object-fit: cover;
    aspect-ratio: 1;
    max-width: 500px !important;
    max-height: 500px !important;
    img {
      width: 100%;
      height: 100%;
      max-width: 500px !important;
      max-height: 500px !important;
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
    min-height: 128px;
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
    margin-bottom: 4px;
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
    max-height: 1000px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    font-size: 14px;
    line-height: 18px;
    text-overflow: ellipsis;
    word-wrap: break-word;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    display: block;
    &.o {
      height: 36px;
      max-height: 36px;
      text-overflow: ellipsis;
      overflow: hidden;
      word-wrap: normal;
      white-space: normal;
      overflow-wrap: normal;
    }
    .username {
      margin-right: 4px;
    }
    a {
      display: inline;
    }
  }
  .more {
    line-height: 18px;
    font-size: 14px;
    font-weight: 600;
    color: #a8a8a8;
  }
  .viewc {
    display: block;
    margin-top: 8px;
    font-size: 14px;
    line-height: 18px;
    color: #a8a8a8;
    cursor: pointer;
  }
`;
exports.default = PostItemHome;
