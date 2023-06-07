"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const posts_1 = require("../../../api/posts");
const LoadingBox_1 = __importDefault(require("../../LoadingBox"));
const Icons_1 = require("../../Icons");
const react_redux_1 = require("react-redux");
const profileReducer_1 = require("../../../redux/profileReducer");
const react_redux_2 = require("react-redux");
const LinkQ_1 = __importDefault(require("../LinkQ"));
const profile_1 = require("../../../api/profile");
const UnfollowPopup_1 = __importDefault(require("../../../pages/UnfollowPopup"));
const Navigation_1 = require("../../navigation/Navigation");
const Likes = ({ quit, postid, commentid, subcommentid, type }) => {
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [hasmore, setHasmore] = (0, react_1.useState)(true);
    const [likes, setLikes] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const worker = (e) => {
            if (e.key == "Escape")
                quit();
        };
        window.addEventListener("keydown", worker);
        return () => {
            window.removeEventListener("keydown", worker);
        };
    }, []);
    const next = (data) => {
        setLikes([...likes, ...data]);
        setHasmore(data.length == 1);
        setLoading(false);
    };
    (0, react_1.useEffect)(() => {
        if (type == "post")
            (0, posts_1.getPostLikes)({ postid }).then(next);
        else if (type == "comment")
            (0, posts_1.getCommentLikes)({ postid, commentid: commentid }).then(next);
        else
            (0, posts_1.getSubCommentLikes)({
                postid,
                commentid: commentid,
                subcommentid: subcommentid,
            }).then(next);
    }, []);
    const onScroll = (e) => {
        const { created: date, id } = likes[likes.length - 1];
        if (loading || !hasmore)
            return;
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        if (scrollTop + clientHeight + 40 > scrollHeight) {
            setLoading(true);
            if (type == "post")
                (0, posts_1.getPostLikes)({ postid, id, date }).then(next);
            else if (type == "comment")
                (0, posts_1.getCommentLikes)({
                    postid,
                    commentid: commentid,
                    id,
                    date,
                }).then(next);
            else
                (0, posts_1.getSubCommentLikes)({
                    postid,
                    commentid: commentid,
                    subcommentid: subcommentid,
                    id,
                    date,
                }).then(next);
        }
    };
    const con = (s) => {
        if (s == null)
            return `Follow`;
        if (s == 0)
            return `Following`;
        if (s == 1)
            return `Requested`;
        return ``;
    };
    const { username: myusername } = (0, react_redux_1.useSelector)(profileReducer_1.selectValues, react_redux_2.shallowEqual);
    const [p, _p] = (0, react_1.useState)({
        active: false,
        process: () => { },
        data: { pp: null, username: "" },
    });
    const tap = (p) => {
        const { status, ispublic, username, id, pp } = p;
        if (status == null) {
            // follow
            (0, profile_1.followUserS)(id, true);
            const newLikes = likes.map((l) => {
                if (l.username == username)
                    return Object.assign(Object.assign({}, l), { status: ispublic ? 0 : 1 });
                return l;
            });
            setLikes(newLikes);
        }
        else {
            (0, profile_1.followUserS)(id, false);
            const process = () => {
                const newLikes = likes.map((l) => {
                    if (l.username == username)
                        return Object.assign(Object.assign({}, l), { status: ispublic ? 0 : 1 });
                    return l;
                });
                setLikes(newLikes);
            };
            if (ispublic)
                process();
            else
                _p({ active: true, data: { username, pp }, process });
        }
    };
    return (<>
      <Bg onClick={quit}/>
      <Container>
        <div className="headerxxx">
          <p>Likes</p>
          <button onClick={quit}>
            <Icons_1.CloseIcon />
          </button>
        </div>
        {p.active && (<UnfollowPopup_1.default data={p.data} close={() => _p(Object.assign(Object.assign({}, p), { active: false }))} process={p.process}/>)}
        <ul onScroll={onScroll} className="contentx">
          {loading && <LoadingBox_1.default />}
          {likes.map((obj) => (<li>
              <LinkQ_1.default className="pp" to={`/${obj.username}`}>
                <img onContextMenu={Navigation_1.disableRightClick} src={obj.pp || "/pp.jpg"} alt="pp"/>
              </LinkQ_1.default>
              <div className="text">
                <LinkQ_1.default to={`/${obj.username}`}>
                  <p className="username">{obj.username}</p>
                </LinkQ_1.default>
                {obj.fullname && <p className="fullname">{obj.fullname}</p>}
              </div>
              {obj.username != myusername && (<button className={con(obj.status)} onClick={() => tap(obj)}>
                  {con(obj.status)}
                </button>)}
            </li>))}
        </ul>
      </Container>
    </>);
};
const Bg = styled_components_1.default.div `
  background-color: rgba(0, 0, 0, 0.5);
  width: 200vw;
  height: 200vh;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1300;
  transform: translate(-10%, -10%);
`;
const Container = styled_components_1.default.div `
  transform: scale(1.2);
  @keyframes scx {
    from {
      transform: scale(1.2);
    }
    to {
      transform: scale(1);
    }
  }
  animation: scx 0.1s ease-in-out forwards;
  width: 400px;
  background-color: #262626;
  border-radius: 8px;
  height: 400px;
  position: fixed;
  z-index: 1400;
  left: calc(50% - 200px);
  top: calc(50% - 200px);
  border-radius: 1rem;
  .headerxxx {
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-weight: 600;
    border-bottom: 1px solid #363636;
    button {
      width: 2rem;
      height: 2rem;
      position: absolute !important;
      right: 10px;
    }
  }
  .contentx {
    height: calc(100% - 42px);
    overflow-y: auto;
    .loading-box {
      margin: 2rem 0px;
      position: relative;
      height: 2rem;
      background-color: transparent;
    }
    li {
      display: flex;
      height: 60px;
      padding: 0.5rem 1rem;
      align-items: center;
      .pp {
        width: 44px;
        height: 44px;
        margin-right: 12px;
        display: block;
        img {
          width: 44px;
          height: 44px;
          border-radius: 100%;
        }
      }
      .text {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 36px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        p {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 18px;
          font-size: 14px;
          margin: 0px;
          &.username {
            font-weight: 600;
          }
          &.fullname {
            color: #a8a8a8;
            font-weight: 400;
          }
        }
      }
      button {
        margin-left: 12px;
        padding: 7px 1rem;
        border-radius: 8px;
        background-color: #fafafa;
        color: #000;
        font-size: 14px;
        font-weight: 600;
        &:hover {
          opacity: 0.8;
        }
        &.Follow {
          background-color: #0095f6;
          color: #fafafa;
        }
      }
    }
  }
  @media screen and (max-width: 464px) {
    left: 2rem;
    width: calc(100% - 4rem);
  }
  @media screen and (max-height: 464px) {
    top: 2rem;
    max-height: calc(100% - 4rem);
  }
`;
exports.default = Likes;
