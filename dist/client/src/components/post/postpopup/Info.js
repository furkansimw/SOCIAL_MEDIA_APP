"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Icons_1 = require("../../Icons");
const styled_components_1 = __importDefault(require("styled-components"));
const Navigation_1 = require("../../navigation/Navigation");
const react_redux_1 = require("react-redux");
const postsReducer_1 = require("../../../redux/postsReducer");
const LinkQ_1 = __importDefault(require("../LinkQ"));
const profileReducer_1 = require("../../../redux/profileReducer");
const react_1 = require("react");
const Context_1 = __importDefault(require("../Context"));
const react_redux_2 = require("react-redux");
const profile_1 = require("../../../api/profile");
const Info = () => {
    var _a;
    const back = (0, react_redux_1.useSelector)(postsReducer_1.selectBack, react_redux_1.shallowEqual);
    const { username, pp, owner: userid, } = (0, react_redux_1.useSelector)(postsReducer_1.selectCurrentPost, react_redux_1.shallowEqual);
    const { username: myusername } = (0, react_redux_1.useSelector)(profileReducer_1.selectValues, react_redux_1.shallowEqual);
    const profile = (0, react_redux_1.useSelector)((s) => (0, postsReducer_1.selectProfile)(s, username), react_redux_1.shallowEqual);
    const post = (0, react_redux_1.useSelector)(postsReducer_1.selectCurrentPost, react_redux_1.shallowEqual);
    const to = `/${username}`;
    const isfollowing = ((_a = profile === null || profile === void 0 ? void 0 : profile.info) === null || _a === void 0 ? void 0 : _a.status) == 0;
    const [p, _p] = (0, react_1.useState)(false);
    const dispatch = (0, react_redux_2.useDispatch)();
    const follow = () => dispatch((0, profile_1.followUser)({ a: true, userid }));
    return (<InfoContainer>
      <div className="l">
        <LinkQ_1.default className="pp" to={to}>
          <img onContextMenu={Navigation_1.disableRightClick} src={pp || "/pp.jpg"} alt="pp"/>
        </LinkQ_1.default>
        <LinkQ_1.default className="username" to={to}>
          <p>{username}</p>
        </LinkQ_1.default>
        {username != myusername && !isfollowing && back != "home" && (<>
            <span>•</span>
            <button onClick={follow}>Follow</button>
          </>)}
      </div>
      <button onClick={() => _p(true)} className="d">
        <Icons_1.DetailIcon />
      </button>
      {p && <Context_1.default post={post} close={() => _p(false)}/>}
    </InfoContainer>);
};
const InfoContainer = styled_components_1.default.div `
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 14px 1rem;
  border-bottom: 1px solid #262626;
  .l {
    display: flex;
    align-items: center;
    .pp {
      img {
        width: 2rem;
        height: 2rem;
        border-radius: 100%;
      }
      margin-right: 14px;
    }
    .username {
      p {
        font-size: 14px;
        font-weight: 600;
        line-height: 18px;
      }
    }
    span {
      margin: 0px 6px;
    }
    button {
      background-color: transparent;
      border: none;
      outline: none;
      font-size: 14px;
      font-weight: 600;
      color: #0095f6;
      &:hover {
        color: #fafafa;
      }
    }
  }
  .d {
    width: 24px;
    height: 24px;
    background-color: transparent;
    border: none;
    outline: none;
  }
  a:hover {
    opacity: 0.6;
  }
  .d:hover {
    opacity: 0.6;
  }
`;
exports.default = Info;
