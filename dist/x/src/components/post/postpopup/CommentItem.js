"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const posts_1 = require("../../../api/posts");
const postsReducer_1 = require("../../../redux/postsReducer");
const Icons_1 = require("../../Icons");
const LoadingBox_1 = __importDefault(require("../../LoadingBox"));
const LinkConverter_1 = __importDefault(require("../LinkConverter"));
const LinkQ_1 = __importDefault(require("../LinkQ"));
const SubCommentItem_1 = __importDefault(require("./SubCommentItem"));
const react_redux_1 = require("react-redux");
const Bottom_1 = require("./Bottom");
const styled_components_1 = __importDefault(require("styled-components"));
const Likes_1 = __importDefault(require("./Likes"));
const CommentItem = ({ comment, reply }) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { id: commentid, username, pp, likecount, subcommentcount, content, isliked, created, subcomments: { data, hasmore, t, loading }, } = comment;
    const postid = window.location.pathname.split("/")[2];
    const likeCommentT = () => dispatch((0, posts_1.likeComment)({ a: !isliked, commentid, postid }));
    const date = (0, react_1.useMemo)(() => (0, Bottom_1.dateCalc)(created), []);
    const replyHandle = () => reply(commentid, username);
    const view = () => {
        var _a, _b;
        const date = (_a = data[data.length - 1]) === null || _a === void 0 ? void 0 : _a.created, id = (_b = data[data.length - 1]) === null || _b === void 0 ? void 0 : _b.id;
        if (hasmore && subcommentcount > 0)
            dispatch((0, posts_1.getComments)({ postid, commentid, date, id }));
        else
            dispatch((0, postsReducer_1.toggleSubCommetsT)({ postid, commentid, t: !t }));
    };
    const lastActive = (0, react_1.useMemo)(() => (new Date(Date.now()).getTime() - new Date(created).getTime()) / 1000 < 1, []);
    const like = () => {
        if (isliked)
            return;
        dispatch((0, posts_1.likeComment)({ a: true, commentid, postid }));
    };
    const [likesPopup, setLikesPopup] = (0, react_1.useState)(false);
    const viewLikes = () => setLikesPopup(true);
    const quit = () => setLikesPopup(false);
    return (<Container className={lastActive ? "lastactive" : ""}>
      <div className="left" onDoubleClick={like}>
        <div className="pp">
          <LinkQ_1.default className="u" to={`/${username}`}>
            <img src={pp || "/pp.jpg"} alt="pp"/>
          </LinkQ_1.default>
        </div>
      </div>
      <div className="right">
        <div className="upside" onDoubleClick={like}>
          <pre>
            <LinkQ_1.default className="username" to={`/${username}`}>
              {username}
            </LinkQ_1.default>
            <LinkConverter_1.default text={content}/>
          </pre>
          <button onClick={likeCommentT} className={isliked ? "active" : ""}>
            <Icons_1.LikeIconComment isactive={isliked}/>
          </button>
          {likesPopup && (<Likes_1.default postid={postid} type="comment" commentid={commentid} quit={quit}/>)}
        </div>
        <div className="down-side" onDoubleClick={like}>
          {likecount > 0 && (<button onClick={viewLikes} className="likes">
              {likecount} like{likecount > 1 && `s`}
            </button>)}
          <p className="date">{date}</p>
          <button className="reply" onClick={replyHandle}>
            Reply
          </button>
          <button className="more">
            <Icons_1.MoreIcon2 />
          </button>
        </div>
        {subcommentcount > 0 && (<ul className="view-replies">
            <div className="up">
              <button onClick={view}>
                <div className="line"></div>
                {t && !hasmore ? (<p>Hide Replies</p>) : (<p>
                    View replies (
                    {hasmore ? subcommentcount - data.length : subcommentcount})
                  </p>)}
              </button>
              {loading && <LoadingBox_1.default />}
            </div>
            {(hasmore ? data.length > 0 : t) &&
                data.map((sc) => (<SubCommentItem_1.default key={sc.id} subcomment={sc} commentid={commentid} reply={() => reply(comment.id, sc.username)}/>))}
          </ul>)}
      </div>
    </Container>);
};
const Container = styled_components_1.default.li `
  display: flex;
  align-items: start;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  padding: 8px 1rem;
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
  &:hover .more {
    display: block !important;
  }
  .left {
    width: 2rem;
    margin-right: 18px;
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
        .username {
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
        user-select: none;
        font-size: 12px;
        font-weight: 600;
        color: #a8a8a8;
        margin-right: 12px;
      }
      .reply {
        font-size: 12px;
        margin-right: 12px;
        color: #a8a8a8;
      }
      .more {
        display: none;
      }
    }
    .view-replies {
      margin-top: 1rem;
      .up {
        height: 18px;
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        .loading-box {
          width: 20px;
          height: 20px;
        }
        button {
          display: flex;
          align-items: center;
          margin-right: 12px;
          .line {
            margin-right: 1rem;
            width: 24px;
            height: 1px;
            background-color: #a8a8a8;
          }
          color: #a8a8a8;
          font-size: 12px;
        }
      }
    }
  }
`;
exports.default = CommentItem;
