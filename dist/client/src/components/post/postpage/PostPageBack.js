"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const PostPageBack = () => {
    var _a;
    const back = useSelector(selectBack, shallowEqual);
    const { username, pp, owner: userid, } = useSelector(selectCurrentPost, shallowEqual);
    const { username: myusername } = useSelector(selectValues, shallowEqual);
    const profile = useSelector((s) => selectProfile(s, username), shallowEqual);
    const post = useSelector(selectCurrentPost, shallowEqual);
    const to = `/${username}`;
    const isfollowing = ((_a = profile === null || profile === void 0 ? void 0 : profile.info) === null || _a === void 0 ? void 0 : _a.status) == 0;
    const [p, _p] = useState(false);
    const dispatch = useDispatch();
    const follow = () => dispatch(followUser({ a: true, userid }));
    return (<InfoContainer>
      <div className="l">
        <LinkQ className="pp" to={to}>
          <img onContextMenu={disableRightClick} src={pp || "/pp.jpg"} alt="pp"/>
        </LinkQ>
        <LinkQ className="username" to={to}>
          <p>{username}</p>
        </LinkQ>
        {username != myusername && !isfollowing && back != "home" && (<>
            <span>•</span>
            <button onClick={follow}>Follow</button>
          </>)}
      </div>
      <button onClick={() => _p(true)} className="d">
        <DetailIcon />
      </button>
      {p && <Context post={post} close={() => _p(false)}/>}
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
exports.default = PostPageBack;
