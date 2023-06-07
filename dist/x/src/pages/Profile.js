"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const postsReducer_1 = require("../redux/postsReducer");
const react_1 = require("react");
const react_redux_2 = require("react-redux");
const profile_1 = require("../api/profile");
const LoadingBox_1 = __importDefault(require("../components/LoadingBox"));
const styled_components_1 = __importDefault(require("styled-components"));
const Icons_1 = require("../components/Icons");
const Title_1 = __importDefault(require("../components/Title"));
const PostMini_1 = __importDefault(require("../components/post/PostMini"));
const NotFound_tsx_1 = __importDefault(require("../components/profile/NotFound.tsx"));
const profileReducer_ts_1 = require("../redux/profileReducer.ts");
const Navigation_tsx_1 = require("../components/navigation/Navigation.tsx");
const Priv_tsx_1 = __importDefault(require("../components/profile/Priv.tsx"));
const Profile = () => {
    const [s, _s] = (0, react_1.useState)(false);
    const p = (0, react_router_dom_1.useLocation)().pathname.split("/");
    const username = p[1];
    const [block, setBlock] = (0, react_1.useState)([false, false]);
    const [more, setMore] = (0, react_1.useState)(false);
    const dispatch = (0, react_redux_2.useDispatch)();
    const profile = (0, react_redux_1.useSelector)((s) => (0, postsReducer_1.selectProfile)(s, username), react_redux_1.shallowEqual);
    (0, react_1.useEffect)(() => {
        if (!profile)
            dispatch((0, profile_1.getProfile)(username));
        if (!profile)
            dispatch((0, profile_1.getProfilePosts)({ username }));
    }, [username]);
    const posts = (0, react_redux_1.useSelector)((s) => (0, postsReducer_1.selectPostsProfile)(s, username), react_redux_1.shallowEqual);
    const { username: myusername } = (0, react_redux_1.useSelector)(profileReducer_ts_1.selectValues, react_redux_1.shallowEqual);
    const listRef = (0, react_1.useRef)(null);
    (0, react_1.useLayoutEffect)(() => {
        var _a;
        if (!(profile === null || profile === void 0 ? void 0 : profile.info) || listRef.current == null)
            return;
        const offset = profile.info.offset || 0;
        (_a = listRef.current) === null || _a === void 0 ? void 0 : _a.scroll({ top: offset });
        return () => {
            var _a, _b;
            dispatch((0, postsReducer_1.setOffset)({ page: username, offset: (_b = (_a = listRef.current) === null || _a === void 0 ? void 0 : _a.scrollTop) !== null && _b !== void 0 ? _b : 0 }));
        };
    }, []);
    if (!profile)
        return <></>;
    const { postsState, loading } = profile;
    if (profile.exists == false)
        return <NotFound_tsx_1.default />;
    if (loading || !postsState || !profile.info)
        return <></>;
    const { info } = profile;
    const { followercount, followingcount, postcount, status, id: userid, fullname, bio, } = info;
    const statusClick = () => {
        if (status == 2)
            setBlock([true, false]);
        else {
            if (status == null)
                dispatch((0, profile_1.followUser)({ a: true, userid }));
            else
                dispatch((0, profile_1.followUser)({ a: false, userid }));
        }
    };
    const statusController = () => {
        if (status == null)
            return "Follow";
        return ["Following", "Requested", "Blocked"][status];
    };
    const ismyprofile = username == myusername;
    const k = (n) => {
        if (n >= 1000000000)
            return (n / 1000000000).toFixed(1) + "B";
        else if (n >= 1000000)
            return (n / 1000000).toFixed(1) + "M";
        else if (n >= 1000)
            return (n / 1000).toFixed(1) + "K";
        return n;
    };
    const a = k(postcount);
    const b = k(followercount);
    const c = k(followingcount);
    const onScroll = (e) => {
        const { hasmore, loading } = postsState;
        if (loading || !hasmore)
            return;
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollTop + clientHeight + 100 >= scrollHeight) {
            const { created: date, id } = posts[posts.length - 1];
            dispatch((0, profile_1.getProfilePosts)({ username, date, id }));
        }
    };
    return (<Container onScroll={onScroll} ref={listRef}>
      <Title_1.default title={username}/>
      <div className="info">
        <div className="pp">
          <img onContextMenu={Navigation_tsx_1.disableRightClick} src={(info === null || info === void 0 ? void 0 : info.pp) || "/pp.jpg"}/>
        </div>
        <div className="text">
          <div className="up">
            <p className="username">{username}</p>
            {ismyprofile ? (<>
                <react_router_dom_1.Link to={`/account/edit`} className="edit">
                  Edit profile
                </react_router_dom_1.Link>
              </>) : (<>
                <button onClick={statusClick} className={`state ${statusController()}`}>
                  {statusController()}
                </button>
                <button className="message">Message</button>
                <button className="more" onClick={() => setMore(true)}>
                  <Icons_1.MoreIcon3 />
                </button>
              </>)}
          </div>
          <div className="details">
            <p>
              <span>{a}</span> posts
            </p>
            <p>
              <span>{b}</span> followers
            </p>
            <p>
              <span>{c}</span> following
            </p>
          </div>
          {fullname && <div className="fullname">{fullname}</div>}
          {bio && <pre className="bio">{bio}</pre>}
        </div>
      </div>
      <Priv_tsx_1.default info={info}/>
      {block[0] && (<Block close={() => setBlock([false, false])} username={username} state={block[1]} userid={userid}/>)}
      {more && (<More close={() => setMore(false)} procces={() => setBlock([true, true])}/>)}
      <ul>
        {posts.map((post) => (<PostMini_1.default post={post} back={username}/>))}
      </ul>
      {(postsState === null || postsState === void 0 ? void 0 : postsState.loading) && <LoadingBox_1.default />}
    </Container>);
};
const Block = ({ state, username, close, userid, }) => {
    const dispatch = (0, react_redux_2.useDispatch)();
    const tap = () => {
        dispatch((0, profile_1.blockUser)({ a: state, userid }));
        close();
    };
    return (<>
      <Bg onClick={close}/>
      <div className="block">
        <div className="txt">
          <h1>
            {state ? `Block` : `Unblock`} {username}
          </h1>
          <p>
            {state
            ? `They won't be able to find your profile, posts or story on App.
          Instagram won't let them know you blocked them.`
            : `They will now be able to see your posts and follow
          you on App. Instagram won't let them know you unblocked them.`}
          </p>
        </div>
        <button onClick={tap} className="b">
          {state ? `Block` : `Unblock`}
        </button>
        <button onClick={close}>Cancel</button>
      </div>
    </>);
};
const More = ({ close, procces, }) => {
    return (<>
      <Bg onClick={close}/>
      <div className="morep">
        <button onClick={() => {
            close();
            procces();
        }} className="b">
          Block
        </button>
        <button onClick={close}>Cancel</button>
      </div>
    </>);
};
const Bg = styled_components_1.default.div `
  background-color: rgba(0, 0, 0, 0.5);

  width: 100vw;

  height: 100vh;

  position: fixed;

  z-index: 100;

  left: 0px;

  top: 0px;
`;
const Container = styled_components_1.default.ul `
  height: 100vh;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  .loading-box {
    margin: 4rem 0px;
  }
  button {
    &.more {
      svg {
        fill: #fafafa;
      }
    }
    &.settings {
      background-color: transparent !important;
      padding: 0px !important;
      &:hover {
        opacity: 1 !important;
      }
    }
  }
  .priv {
    max-width: calc(906px + 4rem);
    width: 100%;
    border: 1px solid #262626;
    text-align: center;
    padding: 40px;
    p {
      font-size: 14px;
      margin-top: 6px;
    }
    span {
      cursor: pointer;
      color: #0095f6;
      font-weight: 600;
      cursor: pointer;
      &.us {
        color: #fff;
      }
    }
  }
  .info {
    display: flex;
    max-width: calc(906px + 4rem);
    align-items: start;
    padding: 2rem 2rem 1rem;
    width: 100%;
    @media screen and (max-width: 800px) {
      .pp,
      img {
        width: 120px !important;
        height: 120px !important;
      }
    }
    .pp {
      min-width: 150px;

      width: 100%;

      height: 150px;

      flex: 1;

      display: flex;

      justify-content: center;

      img {
        width: 150px;

        height: 150px;

        object-fit: cover;

        border-radius: 100%;
      }
    }
    .text {
      height: 100%;

      flex: 2;

      overflow: hidden;

      .up {
        margin-bottom: 20px;

        display: flex;

        align-items: center;

        .username {
          font-size: 20px;

          margin-right: 2rem;

          max-width: 390px;

          overflow: hidden;

          text-overflow: ellipsis;

          white-space: nowrap;
        }
        button,
        a {
          padding: 7px 1rem;
          border-radius: 8px;
          color: #000;
          background-color: #fafafa;
          margin-right: 1rem;
          font-weight: 600;
          font-size: 14px;
          &:hover {
            opacity: 0.8;
          }
          &.more {
            padding: 0px;
            background-color: transparent;
            opacity: 1 !important;
          }
          &.state {
            &.Follow {
              background-color: #0095f6 !important;
              color: #fafafa;
            }
          }
        }
      }
      .details {
        display: flex;

        justify-content: space-between;

        max-width: 260px;

        width: 100%;

        line-height: 18px;

        margin-bottom: 1rem;

        p {
          cursor: pointer;
        }
        span {
          font-weight: 600;
        }
      }
      .fullname {
        max-width: 450px;

        overflow: hidden;

        font-size: 14px;

        font-weight: 600;

        line-height: 18px;

        text-overflow: ellipsis;

        margin-bottom: 6px;
      }
      .bio {
        max-width: 450px;

        width: 100%;

        line-height: 18px;

        max-height: 80px;

        overflow-y: auto;

        font-size: 14px;

        white-space: pre-wrap;

        word-wrap: break-word;

        &:hover::-webkit-scrollbar {
          display: block;
        }
        &::-webkit-scrollbar {
          width: 8px;

          display: none;
        }
        &::-webkit-scrollbar-thumb {
          width: 8px;

          border-radius: 8px;

          background-color: #363636;

          &:active {
            background-color: #505050;
          }
        }
      }
    }
  }
  .morep {
    border-radius: 12px;
    background-color: #262626;
    width: 400px;
    position: fixed;
    z-index: 120;
    top: calc(50% - 150px);
    left: calc(50% - 200px);
    @keyframes an {
      0% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }
    animation: an 0.1s ease-in-out;
    button {
      display: block;

      height: 50px;

      display: flex;

      justify-content: center;

      align-items: center;

      font-size: 14px;

      color: #fafafa;

      width: 100%;

      border-top: 1px solid #363636;

      &:first-child {
        border-top: none;
      }
      &.b {
        font-weight: 600;

        color: #ed4956;
      }
    }
  }
  ul {
    max-width: calc(906px + 4rem);
    width: 100%;
    padding: 2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 3px;
  }
  .block {
    border-radius: 12px;
    background-color: #262626;
    width: 400px;
    position: fixed;
    z-index: 120;
    top: calc(50% - 150px);
    left: calc(50% - 200px);
    @keyframes an {
      0% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }
    animation: an 0.1s ease-in-out;
    .txt {
      padding: 2rem;
      h1 {
        color: #f5f5fe;
        font-size: 20px;
        font-weight: 400;
        text-align: center;
      }
      p {
        font-size: 14px;
        color: #a8a8a8;
        text-align: center;
      }
    }

    button {
      display: block;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #fafafa;
      width: 100%;
      border-top: 1px solid #363636;
      &:first-child {
        border-top: none;
      }
      &.b {
        font-weight: 600;
        color: #ed4956;
      }
    }
  }
`;
exports.default = Profile;
