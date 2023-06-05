"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateCalc = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
const LoadingBox_1 = __importDefault(require("../../LoadingBox"));
const posts_1 = require("../../../api/posts");
const react_redux_1 = require("react-redux");
const profileReducer_1 = require("../../../redux/profileReducer");
const react_1 = require("react");
const postsReducer_1 = require("../../../redux/postsReducer");
const Icons_1 = require("../../Icons");
const LinkQ_1 = __importDefault(require("../LinkQ"));
const Likes_1 = __importDefault(require("./Likes"));
const dateCalc = (d) => {
    const now = new Date(Date.now());
    const date = new Date(d);
    const diffM = parseInt(((now.getTime() - date.getTime()) / 1000 / 60).toString());
    if (diffM < 1)
        return `now`;
    if (diffM < 60)
        return `${diffM}m ago`;
    const diffH = parseInt((diffM / 60).toString());
    if (diffH < 24)
        return `${diffH}h ago`;
    const sameYear = now.getFullYear() == date.getFullYear();
    const month = [
        `Jan`,
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ][date.getMonth()];
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    if (diffH / 24 < 7)
        return `${parseInt((diffH / 24).toString())}d ago`;
    if (sameYear)
        return `${day} ${month}`;
    return `${day} ${month} ${date.getFullYear()}`;
};
exports.dateCalc = dateCalc;
const Bottom = (0, react_1.forwardRef)(({ comment, setComment, isRepliying }, inputRef) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const myvalues = (0, react_redux_1.useSelector)(profileReducer_1.selectValues, react_redux_1.shallowEqual);
    const postid = window.location.pathname.split("/")[2];
    const { comments: { sending }, isliked, id, likecount, issaved, created, } = (0, react_redux_1.useSelector)(postsReducer_1.selectCurrentPost, react_redux_1.shallowEqual);
    const date = (0, react_1.useMemo)(() => (0, exports.dateCalc)(created), []);
    const like = () => dispatch((0, posts_1.createAction)({ postid, a: !isliked, t: "like" }));
    const save = () => dispatch((0, posts_1.createAction)({ postid, a: !issaved, t: "save" }));
    const [likesPopup, setLikesPopup] = (0, react_1.useState)(false);
    const quit = () => setLikesPopup(false);
    const viewLikes = () => setLikesPopup(true);
    return (<BottomContainer>
        <div className="icons">
          <div className="l">
            <button className={`like ${isliked ? "active" : ``}`} onClick={like}>
              <Icons_1.LikeIcon isactive={isliked}/>
            </button>
            <button onClick={() => inputRef.current.focus()} className="comment">
              <Icons_1.CommentIcon />
            </button>
            {likesPopup && <Likes_1.default type="post" quit={quit} postid={id}/>}
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
          <p className="date">{date}</p>
        </div>
        <form onSubmit={(e) => {
            e.preventDefault();
            if (comment.trim().length === 0)
                return;
            const content = comment.replace(/\s+/g, " ").trim();
            dispatch((0, posts_1.createComment)(Object.assign(Object.assign({ content,
                postid }, myvalues), { commentid: isRepliying === null || isRepliying === void 0 ? void 0 : isRepliying.commentid })));
        }}>
          <input type="text" name="comment" id="comment" placeholder="Add a comment..." ref={inputRef} onChange={(e) => setComment(e.target.value)} value={comment} maxLength={200}/>
          {isRepliying && (<LinkQ_1.default to={`/${isRepliying.username}`}>
              @{isRepliying.username}
            </LinkQ_1.default>)}
          <button disabled={comment.trim().length == 0 ||
            (isRepliying
                ? isRepliying.username.length + 2 > comment.trim().length
                : false)} type="submit">
            Post
          </button>
        </form>
        {sending && <LoadingBox_1.default />}
      </BottomContainer>);
});
const BottomContainer = styled_components_1.default.div `
  position: relative;
  border-top: 1px solid #262626;
  .icons {
    display: flex;
    padding: 6px 1rem 6px;

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
    padding: 0px 1rem;
    margin-bottom: 1rem;
    p {
      margin-bottom: 6px;
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
  form {
    display: flex;
    width: 100%;
    height: 40px;
    border-top: 1px solid #262626;
    padding: 0px 1rem;
    position: relative;
    input {
      background-color: transparent;
      outline: none;
      width: 100%;
      height: 40px;
      border: none;
      line-height: 20px;
      padding-right: 10px;
      font-weight: 400;
      height: 40px;
      &::placeholder {
        color: #a8a8a8;
      }
    }
    a {
      background-color: #000;
      position: absolute;
      font-weight: 600;
      font-size: 14px;
      top: 10px;
      height: 18px;
      left: 10.5px;
      padding-right: 4px;
    }
    button {
      color: #0095f6;
      background-color: transparent;
      border: none;
      font-size: 14px;
      font-weight: 600;
      outline: none;
      &:disabled {
        cursor: default;
        opacity: 0.6;
      }
      margin-right: 10px;
    }
  }
  .loading-box {
    position: absolute;
    left: 0px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0px;
  }
`;
exports.default = Bottom;
