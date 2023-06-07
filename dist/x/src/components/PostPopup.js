"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bg = void 0;
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const styled_components_1 = __importDefault(require("styled-components"));
const postsReducer_1 = require("../redux/postsReducer");
const PostPopupComments_1 = __importDefault(require("./post/postpopup/PostPopupComments"));
const PostPopupImages_1 = __importDefault(require("./post/postpopup/PostPopupImages"));
const PostPopupNav_1 = __importDefault(require("./PostPopupNav"));
const react_redux_2 = require("react-redux");
const PostPopup = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const back = (0, react_redux_2.useSelector)(postsReducer_1.selectBack, react_redux_1.shallowEqual);
    const close = () => {
        window.history.replaceState(null, "", `/${back == "home" ? "" : back}`);
        dispatch((0, postsReducer_1.setBack)(null));
        dispatch((0, postsReducer_1.setCurrentPostId)(null));
    };
    const worker2 = (e) => {
        if (e.key == "Escape")
            close();
    };
    (0, react_1.useEffect)(() => {
        const worker = () => dispatch((0, postsReducer_1.setBack)(null));
        window.addEventListener("popstate", worker);
        window.addEventListener("keydown", worker2);
        return () => {
            window.removeEventListener("popstate", worker);
            window.removeEventListener("keydown", worker2);
        };
    }, []);
    return (<>
      <exports.Bg onClick={close}/>
      <Container>
        <PostPopupImages_1.default />
        <PostPopupComments_1.default />
      </Container>
      {back != "home" && <PostPopupNav_1.default />}
    </>);
};
exports.Bg = styled_components_1.default.div `
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 0px;
  position: fixed;
  z-index: 120;
`;
const Container = styled_components_1.default.div `
  border-radius: 4px;
  @media screen and (max-width: 1328px) {
    left: 4rem !important;
    width: calc(100% - 8rem) !important;
    .cvr,
    .images {
      width: 100%;
      min-width: 500px;
      object-fit: cover;
    }
  }

  @media screen and (max-height: 864px) {
    top: 2rem !important;
    height: calc(100% - 4rem) !important;
  }

  background-color: rgba(0, 0, 0, 0.6);
  left: calc(50% - 600px);
  top: calc(50% - 400px);
  max-width: 1200px;
  width: 100%;
  height: 100%;
  max-height: 800px;
  position: fixed;
  z-index: 150;
  background-color: #000;
  display: flex;
  transform: scale(1.2);
  @keyframes sc {
    from {
      transform: scale(1.2);
    }
    to {
      transform: scale(1);
    }
  }
  animation: sc 0.1s ease-in-out forwards;
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
  .cvr {
    height: 100%;
    max-width: 800px;
    width: 100%;
    min-width: 500px;
    position: relative;

    .layer {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 10;
    }
    .cover {
      width: 100%;
      object-fit: cover;
      height: 100%;
    }
  }
  .swiper {
    height: 100%;
  }
  .images {
    height: 100%;
    width: 800px;
    position: relative;
    img {
      width: 100%;
      object-fit: cover;
      height: 100%;
      max-width: 800px;
    }
    .layer {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
    }
  }
`;
exports.default = PostPopup;
