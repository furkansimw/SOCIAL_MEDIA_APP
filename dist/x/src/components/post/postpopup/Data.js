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
const styled_components_1 = __importDefault(require("styled-components"));
const LoadingBox_1 = __importDefault(require("../../LoadingBox"));
const react_redux_1 = require("react-redux");
const postsReducer_1 = require("../../../redux/postsReducer");
const Bottom_1 = require("./Bottom");
const react_1 = require("react");
const react_redux_2 = require("react-redux");
const posts_1 = require("../../../api/posts");
const LinkConverter_1 = __importDefault(require("../LinkConverter"));
const LinkQ_1 = __importDefault(require("../LinkQ"));
const CommentItem_1 = __importDefault(require("./CommentItem"));
const react_2 = __importStar(require("react"));
const Data = (0, react_1.forwardRef)(({ reply }, ref) => {
    const dataContainerRef = (0, react_2.useRef)(null);
    const contentRef = (0, react_2.useRef)(null);
    const dispatch = (0, react_redux_2.useDispatch)();
    const postid = window.location.pathname.split("/")[2];
    const { comments: { data, loading, hasmore }, } = (0, react_redux_1.useSelector)(postsReducer_1.selectCurrentPost, react_redux_1.shallowEqual);
    const onScroll = (e) => {
        var _a, _b;
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        if (loading || !hasmore)
            return;
        if (clientHeight + scrollTop > scrollHeight - 132) {
            dispatch((0, posts_1.getComments)({
                postid,
                id: (_a = data[data.length - 1]) === null || _a === void 0 ? void 0 : _a.id,
                date: (_b = data[data.length - 1]) === null || _b === void 0 ? void 0 : _b.created,
            }));
        }
    };
    (0, react_2.useImperativeHandle)(ref, () => ({
        dataContainerRef,
        contentRef,
    }));
    return (<DataContainer ref={dataContainerRef} onScroll={onScroll}>
      <Content ref={contentRef}/>
      {data.map((comment) => (<CommentItem_1.default key={comment.id} comment={comment} reply={reply}/>))}
      {loading && <LoadingBox_1.default />}
    </DataContainer>);
});
const DataContainer = styled_components_1.default.ul `
  height: calc(100% - 146px - 71px);
  overflow-y: auto;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
  .loading-box {
    margin: 1rem 0px;
  }
  .content {
    padding: 1rem;
    display: flex;
    width: 324px;
    margin-bottom: 1rem;
    pre {
      width: 100%;
      text-overflow: ellipsis;
      word-wrap: break-word;
      font-size: 14px;
      line-height: 18px;
      word-wrap: break-word;
      white-space: pre-wrap;
      overflow-wrap: break-word;
    }
    .pp {
      margin-right: 18px;
      a {
        width: 2rem;
        height: 2rem;
        display: block;
        &.b {
          font-weight: 400;
          color: #e0f1ff;
        }
        img {
          border-radius: 100%;
          width: 100%;
          height: 100%;
        }
      }
    }
    .text {
      font-size: 14px;
      width: 100%;
      .username {
        margin-right: 4px;
        font-weight: 600;
      }
      p {
        font-size: 12px;
        color: #a8a8a8;
        margin-top: 8px;
      }
    }
  }
`;
const Content = (0, react_1.forwardRef)((_props, contentRef) => {
    const { pp, username, content, created } = (0, react_redux_1.useSelector)(postsReducer_1.selectCurrentPost, react_redux_1.shallowEqual);
    const date = (0, react_1.useMemo)(() => (0, Bottom_1.dateCalc)(created), []);
    return (<div ref={contentRef} className="content">
      <div className="pp">
        <LinkQ_1.default to={`/${username}`}>
          <img src={pp || "/pp.jpg"} alt="pp"/>
        </LinkQ_1.default>
      </div>
      <div className="text">
        <pre>
          <LinkQ_1.default className="username" to={`/${username}`}>
            {username}
          </LinkQ_1.default>
          {content && <LinkConverter_1.default text={content}/>}
        </pre>
        <p>{date}</p>
      </div>
    </div>);
});
exports.default = Data;
