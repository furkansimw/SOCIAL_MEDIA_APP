"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const styled_components_1 = __importDefault(require("styled-components"));
const Icons_1 = require("../../Icons");
const LinkConverter_1 = __importDefault(require("../LinkConverter"));
const LinkQ_1 = __importDefault(require("../LinkQ"));
const react_redux_1 = require("react-redux");
const posts_1 = require("../../../api/posts");
const Bottom_1 = require("./Bottom");
const Likes_1 = __importDefault(require("./Likes"));
const Report_1 = __importDefault(require("./Report"));
const SubCommentItem = ({ subcomment, commentid, reply, }) => {
    const { isliked, pp, username, content, created, likecount, id: subcommentid, } = subcomment;
    const dispatch = (0, react_redux_1.useDispatch)();
    const postid = window.location.pathname.split("/")[2];
    const likeSubComment = () => dispatch((0, posts_1.likeComment)({ a: !isliked, commentid, postid, subcommentid }));
    const date = (0, react_1.useMemo)(() => (0, Bottom_1.dateCalc)(created), []);
    const lastActive = (0, react_1.useMemo)(() => (new Date(Date.now()).getTime() - new Date(created).getTime()) / 1000 < 1, []);
    const like = () => {
        if (isliked)
            return;
        dispatch((0, posts_1.likeComment)({ a: true, commentid, postid, subcommentid }));
    };
    const [likesPopup, setLikesPopup] = (0, react_1.useState)(false);
    const viewLikes = () => setLikesPopup(true);
    const quit = () => setLikesPopup(false);
    const [r, _r] = (0, react_1.useState)(false);
    return (<Container onDoubleClick={like} className={lastActive ? "lastactive" : ""}>
      <div className="left">
        <div className="pp">
          <LinkQ_1.default className="u" to={`/${username}`}>
            <img src={pp || "/pp.jpg"} alt="pp"/>
          </LinkQ_1.default>
        </div>
      </div>
      <div className="right">
        <div className="upside">
          <pre>
            <LinkQ_1.default className="u" to={`/${username}`}>
              {username}
            </LinkQ_1.default>
            <LinkConverter_1.default text={content}/>
          </pre>
          <button onClick={likeSubComment} className={isliked ? "active" : ""}>
            <Icons_1.LikeIconComment isactive={isliked}/>
          </button>
        </div>
        <div className="down-side">
          {likesPopup && (<Likes_1.default postid={postid} type="comment" commentid={commentid} quit={quit}/>)}
          {likecount > 0 && (<button onClick={viewLikes} className="likes">
              {likecount} like{likecount > 1 && `s`}
            </button>)}
          <p className="date">{date}</p>
          <button className="reply" onClick={reply}>
            Reply
          </button>
          <button onClick={() => _r(true)} className="morex">
            <Icons_1.MoreIcon2 />
          </button>

          {r && (<Report_1.default process={() => dispatch((0, posts_1.deleteComment)({ commentid, postid, subcommentid }))} close={() => _r(false)} data={subcomment}/>)}
        </div>
      </div>
    </Container>);
};
const Container = styled_components_1.default.li `
  display: flex;
  align-items: start;
  padding: 8px 4.5px;
  width: 100%;
  border-radius: 6px;
  &.lastactive {
    @keyframes l {
      0% {
        background-color: transparent;
      }
      25% {
        background-color: transparent;
      }
      50% {
        background-color: rgb(50, 50, 50);
      }
      100% {
        background-color: transparent;
      }
    }
    animation: 3s ease l;
  }
  &:hover .morex {
    display: block !important;
  }
  .left {
    width: 2rem;
    margin-right: 9px !important;
    min-width: 2rem;
    height: 2rem;
    width: 2rem;
    min-height: 2rem;
    .pp {
      a {
        width: 2rem;
        height: 2rem;
        img {
          border-radius: 100%;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
  .right {
    padding: 0px 4.5px;
    width: 100%;
    button {
      background-color: transparent;
    }
    .upside {
      width: 100%;
      display: flex;
      align-items: start;
      pre {
        word-wrap: break-word;
        max-width: 288px;
        width: 100%;
        white-space: pre-wrap;
        font-size: 14px;
        a {
          font-weight: 600;
          margin-right: 4px;
        }
      }
      button {
        margin-left: 18px;
      }
    }
    .down-side {
      display: flex;
      align-items: center;
      height: 18px;
      margin: 8px 0px 4px;
      .likes {
        font-size: 12px;
        color: #a8a8a8;
        margin-right: 12px;
        font-weight: 600;
      }
      .date {
        font-size: 12px;
        color: #a8a8a8;
        user-select: none;
        margin-right: 12px;
        font-weight: 600;
      }
      .reply {
        font-size: 12px;
        margin-right: 12px;
        color: #a8a8a8;
      }
      .morex {
        display: none;
      }
    }
  }
`;
exports.default = SubCommentItem;
