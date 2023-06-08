"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const PostPopup_1 = require("../PostPopup");
const LinkQ_1 = __importDefault(require("./LinkQ"));
const react_redux_1 = require("react-redux");
const profileReducer_1 = require("../../redux/profileReducer");
const react_redux_2 = require("react-redux");
const posts_1 = require("../../api/posts");
const postsReducer_1 = require("../../redux/postsReducer");
const Context = ({ post, close }) => {
    const { id } = (0, react_redux_1.useSelector)(profileReducer_1.selectValues, react_redux_1.shallowEqual);
    const mypost = post.owner == id;
    const dispatch = (0, react_redux_2.useDispatch)();
    const remove = () => dispatch((0, posts_1.removePost)(post.id));
    const back = (0, react_redux_1.useSelector)(postsReducer_1.selectBack, react_redux_1.shallowEqual);
    return (<>
      <PostPopup_1.Bg onClick={close}/>
      <Container className={mypost ? "my" : ""}>
        {mypost && (<button onClick={remove} className="r">
            Remove
          </button>)}
        {back != null && <LinkQ_1.default to={`/p/${post.id}`}>Go to post</LinkQ_1.default>}
        <button onClick={() => navigator.clipboard
            .writeText(window.location.origin + "/p/" + post.id)
            .then(close)}>
          Copy link
        </button>
        <button onClick={close}>Cancel</button>
      </Container>
    </>);
};
const Container = styled_components_1.default.div `
  @keyframes identifierx {
    0% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  animation: identifierx 0.1s ease-in-out all;
  width: 400px;
  background-color: #262626;
  border-radius: 12px;
  border-radius: 12px;
  position: fixed;
  left: calc(50% - 200px);
  top: calc(50% - 75px);
  z-index: 130;
  button,
  a,
  button {
    &.r {
      color: #ed4956;
      font-weight: 600 !important;
    }
    &:first-child {
      border-top: none;
    }
    border-top: 1px solid #363636;
    width: 100%;
    height: 49px;
    font-size: 14px;
    color: #fafafa;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
exports.default = Context;
