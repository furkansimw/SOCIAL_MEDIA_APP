"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disableRightClick = void 0;
const react_1 = require("react"); // with the global mouseevent to avoid collision.
const react_router_dom_1 = require("react-router-dom");
const styled_components_1 = __importDefault(require("styled-components"));
const Icons_1 = require("../Icons");
const react_redux_1 = require("react-redux");
const profileReducer_1 = require("../../redux/profileReducer");
const SearchPanel_1 = __importDefault(require("./SearchPanel"));
const NotificationsPanel_1 = __importDefault(require("./NotificationsPanel"));
const profile_1 = require("../../api/profile");
const CreatePostPopup_1 = __importDefault(require("../createpostpopup/CreatePostPopup"));
const auth_1 = require("../../api/auth");
const socket_1 = __importDefault(require("../../api/socket/socket"));
const Functions_1 = require("./Functions");
const disableRightClick = (e) => e.preventDefault();
exports.disableRightClick = disableRightClick;
const Navigation = () => {
    const [mini, setMini] = (0, react_1.useState)(false);
    const { pathname } = (0, react_router_dom_1.useLocation)();
    const [panel, setPanel] = (0, react_1.useState)(null);
    const [createPostPopup, setCreatePostPopup] = (0, react_1.useState)(false);
    const uiController = (key) => {
        if (createPostPopup)
            return key == "create";
        if (panel) {
            if (panel == "search")
                return key == "search";
            if (panel == "notifications")
                return key == "notifications";
        }
        return key == pathname;
    };
    (0, react_1.useEffect)(() => {
        setMini(panel != null);
    }, [panel]);
    const searchPanelBtnRef = (0, react_1.useRef)(null), notificationPanelBtnRef = (0, react_1.useRef)(null), leftSideRef = (0, react_1.useRef)(null), searchPanelRef = (0, react_1.useRef)(null), notificationPanelRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        window.addEventListener("click", (e) => (0, Functions_1.panelViewController)(e, searchPanelBtnRef, notificationPanelBtnRef, leftSideRef, searchPanelRef, notificationPanelRef, panel, setPanel));
        return () => {
            window.removeEventListener("click", (e) => (0, Functions_1.panelViewController)(e, searchPanelBtnRef, notificationPanelBtnRef, leftSideRef, searchPanelRef, notificationPanelRef, panel, setPanel));
        };
    }, [panel]);
    const closePanel = () => setPanel(null);
    const dispatch = (0, react_redux_1.useDispatch)();
    (0, react_1.useEffect)(() => {
        dispatch((0, profile_1.getMyProfile)());
    }, []);
    const closeCreatePostPopup = () => setCreatePostPopup(false);
    const moreBtnRef = (0, react_1.useRef)(null);
    const morePanelRef = (0, react_1.useRef)(null);
    const [moreIconActive, setMoreIconActive] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const worker = (e) => {
            const p = e.composedPath();
            if (!moreBtnRef.current || !morePanelRef.current)
                return;
            if (p.includes(moreBtnRef.current)) {
                setMoreIconActive((p) => !p);
            }
            else if (p.includes(morePanelRef.current)) {
                setMoreIconActive(true);
            }
            else {
                setMoreIconActive(false);
            }
        };
        window.addEventListener("click", worker);
        return () => {
            window.removeEventListener("click", worker);
        };
    }, []);
    const [newNotification, setNewNotification] = (0, react_1.useState)(false);
    const [notificationsHas, setNotificationsHas] = (0, react_1.useState)(false);
    const { username, pp, id, ncreatedcommentcount, npostlikescount, nreqcount, reqcount, unreadmessagescount, } = (0, react_redux_1.useSelector)(profileReducer_1.selectValues, react_redux_1.shallowEqual);
    (0, react_1.useEffect)(() => {
        socket_1.default.on("notifications", (type) => {
            setNewNotification(true);
            setNotificationsHas(true);
            if ([0, 1].includes(type))
                dispatch((0, profileReducer_1.setUpdateValues)({ nreqcount: nreqcount + 1 }));
            else if (type == 2)
                dispatch((0, profileReducer_1.setUpdateValues)({ npostlikescount: npostlikescount + 1 }));
            else
                dispatch((0, profileReducer_1.setUpdateValues)({ ncreatedcommentcount: ncreatedcommentcount + 1 }));
        });
    }, [nreqcount, ncreatedcommentcount, npostlikescount]);
    const timeoutIdRef = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        if (timeoutIdRef.current)
            clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = setTimeout(() => setNewNotification(false), 4000);
        return () => {
            if (timeoutIdRef.current)
                clearTimeout(timeoutIdRef.current);
        };
    }, [newNotification]);
    const [unreadMessagesCount, setUnreadMessagesCount] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        setNotificationsHas(ncreatedcommentcount > 0 || npostlikescount > 0 || nreqcount > 0);
        setUnreadMessagesCount(unreadmessagescount);
        setNewNotification(ncreatedcommentcount > 0 || npostlikescount > 0 || nreqcount > 0);
    }, [ncreatedcommentcount, unreadmessagescount, npostlikescount, nreqcount]);
    (0, react_1.useEffect)(() => {
        if (panel == "notifications") {
            dispatch((0, profileReducer_1.setUpdateValues)({
                ncreatedcommentcount: 0,
                nreqcount: 0,
                npostlikescount: 0,
            }));
        }
    }, [panel]);
    const closepanel = () => setPanel(null);
    return (<>
      <SearchPanel_1.default close={closePanel} isActive={panel == "search"} ref={searchPanelRef}/>
      <NotificationsPanel_1.default isActive={panel == "notifications"} ref={notificationPanelRef} closepanel={closepanel}/>
      {createPostPopup && <CreatePostPopup_1.default close={closeCreatePostPopup}/>}
      <Container className={mini ? "mini" : ""}>
        <div className="content" ref={leftSideRef}>
          <div className="up">
            <react_router_dom_1.Link onClick={closePanel} to={"/"}>
              <h1>Social Media App</h1>
              <Logo />
            </react_router_dom_1.Link>
          </div>
          <ul>
            <li className={uiController("/") ? "active" : ""}>
              <react_router_dom_1.Link onClick={closePanel} to={"/"}>
                <Icons_1.HomeIcon isactive={uiController("/")}/>
                <p>Home</p>
              </react_router_dom_1.Link>
            </li>
            <li ref={searchPanelBtnRef} className={uiController("search") ? "active" : ""}>
              <div onClick={() => setPanel(panel ? null : "search")}>
                <Icons_1.SearchIcon isactive={uiController("search")}/>
                <p>Search</p>
              </div>
            </li>
            <li className={uiController("/explore") ? "active" : ""}>
              <react_router_dom_1.Link onClick={closePanel} to={"/explore"}>
                <Icons_1.ExploreIcon isactive={uiController("/explore")}/>
                <p>Explore</p>
              </react_router_dom_1.Link>
            </li>
            <li className={uiController("/direct/inbox") ? "active" : ""}>
              <react_router_dom_1.Link onClick={closePanel} to={"/direct/inbox"}>
                <Icons_1.MessagesIcon isactive={uiController("/direct/inbox")}/>
                <p>Messages</p>
                {unreadMessagesCount > 0 && (<div className="circle">
                    <p>{unreadMessagesCount}</p>
                  </div>)}
              </react_router_dom_1.Link>
            </li>
            <li ref={notificationPanelBtnRef} className={uiController("notifications") ? "active" : ""}>
              <div onClick={() => setPanel(panel ? null : "notifications")}>
                <Icons_1.NotificationsIcon isactive={uiController("notifications")}/>
                <p>Notifications</p>
                {notificationsHas && <div className="circle"></div>}
                {newNotification && (<div className={`newnotif`}>
                    {nreqcount > 0 && (<span>
                        <div className="icon people"></div>
                        <p>{nreqcount}</p>
                      </span>)}
                    {npostlikescount > 0 && (<span>
                        <div className="icon post"></div>
                        <p>{npostlikescount}</p>
                      </span>)}
                    {ncreatedcommentcount > 0 && (<span>
                        <div className="icon comment"></div>
                        <p>{ncreatedcommentcount}</p>
                      </span>)}
                  </div>)}
              </div>
            </li>
            <li className={uiController("create") ? "active" : ""}>
              <div onClick={() => setCreatePostPopup(true)}>
                <Icons_1.CreatePostPopupIcon isactive={uiController("create")}/>
                <p>Create</p>
              </div>
            </li>
            <li className={uiController(`/${username}`) ? "active" : ""}>
              <react_router_dom_1.Link onClick={closePanel} to={`/${username}`}>
                <img onContextMenu={exports.disableRightClick} src={pp || "/pp.jpg"} alt="pp"/>
                <p>Profile</p>
              </react_router_dom_1.Link>
            </li>
          </ul>
          <div className="bottom">
            <button ref={moreBtnRef} className={moreIconActive ? "active" : ""}>
              <Icons_1.MoreIcon isactive={moreIconActive}/>
              <p>More</p>
              <MorePanel moreIconActive={moreIconActive} ref={morePanelRef}/>
            </button>
          </div>
        </div>
      </Container>
    </>);
};
const MorePanel = (0, react_1.forwardRef)(({ moreIconActive }, ref) => {
    const myusername = (0, react_redux_1.useSelector)(profileReducer_1.selectValues, react_redux_1.shallowEqual).username;
    return (<div ref={ref} className={`morepanel ${moreIconActive ? "a" : ""}`}>
        <react_router_dom_1.Link to={`/account/edit`}>
          <Icons_1.SettingsIcon />
          <p>Settings</p>
        </react_router_dom_1.Link>
        <react_router_dom_1.Link to={`/${myusername}/saved`}>
          <Icons_1.SavedIcon />
          <p>Saved</p>
        </react_router_dom_1.Link>
        <button onClick={auth_1.logout}>
          <p>Logout</p>
        </button>
      </div>);
});
const Container = styled_components_1.default.div `
  height: 100vh;
  width: 360px;
  .content {
    position: relative;
    z-index: 70;
    background-color: #000;
    position: relative;
    border-right: 1px solid #262626;
    height: 100%;
    width: 100%;
    padding: 8px 12px 20px;
    display: flex;
    min-width: 48px;
    justify-content: space-between;
    flex-direction: column;
    transition: 0.3s ease-in-out width;
    .up {
      display: block;
      padding: 25px 12px 12px;
      width: 100%;
      margin-bottom: 19px;
      height: 74px !important;
      min-height: 74px;
      max-height: 74px;
      h1 {
        font-size: 24px;
        height: 36px;
        display: block;
        width: 100%;
        white-space: nowrap;
        width: 100%;
      }
      .logo {
        display: none;
        animation: scale 0.3s ease-in-out;
        @keyframes scale {
          from {
            transform: scale(0.7);
          }
          to {
            transform: scale(1);
          }
        }
        width: 2rem;
        height: 2rem;
        transition: 0.2s ease transform;
        &:hover {
          transform: scale(1.05);
        }
      }
    }
    ul {
      height: 100%;
      width: 100%;

      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      li {
        position: relative;
        margin: 8px 0px;
        &.active {
          p {
            font-weight: 600;
          }
          img {
            outline: 2px solid #fff;
            outline-offset: 1px;
          }
        }
        a,
        div {
          cursor: pointer;
          border-radius: 8px;
          padding: 12px;
          display: flex;
          align-items: center;
          transition: 0.2s ease all;
          transition-delay: 0.1s;
          svg,
          img {
            min-width: 24px;
            min-height: 24px;
            max-width: 24px;
            max-height: 24px;
            width: 24px;
            height: 24px;
            transition-delay: 0.1s;
            transition: 0.2s ease transform;
          }
          img {
            border-radius: 100%;
          }
          p {
            margin-left: 10px;
          }
          &:hover {
            background-color: rgba(255, 255, 255, 0.12);
            svg {
              transform: scale(1.05);
            }
          }
        }
        .newnotif {
          @keyframes animx {
            0% {
              transform: scale(0.8);
            }
            50% {
              transform: scale(1.25);
            }
            100% {
              transform: scale(1);
            }
          }
          animation: animx 0.3s ease-in-out;
          background-color: #ed4956 !important;
          padding: 8px;
          border-radius: 8px;
          display: flex;
          position: fixed;
          left: 60px;
          z-index: 111;
          span {
            width: 100%;
            display: flex;
            align-items: center;
          }
          .icon {
            &.people {
              background-position: -124px -195px !important;
            }
            &.post {
              background-position: -440px -404px !important;
            }
            &.comment {
              background-position: -514px -110px !important;
              min-width: 18px !important;
              min-height: 18px !important;
            }
            padding: 0px;
            background-repeat: no-repeat;
            background-image: url("/ZWR9C7_JdnP.png");
            height: 16px !important;
            min-width: 16px !important;
            width: 16px !important;
            min-height: 16px !important;
            margin-right: 8px;
            transition: none !important;
            animation: none !important;
          }
          p {
            margin: 0px;
            margin-right: 10px;
            font-weight: 400;
            line-height: 16px;
            font-size: 1rem;
            color: #fafafa;
            display: block !important;
          }
        }
        .circle {
          padding: 0px;
          position: absolute;
          top: 12px;
          left: 28px;
          width: 12px;
          height: 12px;
          background-color: #ed4956 !important;
          display: block !important;
          border-radius: 100%;
          p {
            position: absolute;
            right: 4px;
            z-index: 10;
            bottom: 0px;
            margin: 0px;
            font-size: 10px;
            color: #fff;
            display: block !important;
          }
        }
      }
    }
    .bottom {
      button {
        padding: 12px;
        background-color: transparent;
        display: flex;
        width: 100%;
        position: relative;
        border: none;
        border-radius: 0.5rem;
        outline: none;
        align-items: center;
        &.active {
          p {
            font-weight: 600;
          }
        }
        svg {
          transition: 0.2s ease all;
          transition-delay: 0.1s;
        }
        p {
          font-size: 1rem;
          color: #fafafa;
          margin-left: 10px;
        }
        &:hover {
          background-color: rgba(255, 255, 255, 0.12);
          svg {
            transform: scale(1.05);
          }
        }
      }
    }
  }
  &.mini {
    .content {
      width: 73px;
      .up {
        h1 {
          display: none;
        }
        .logo {
          display: block !important;
        }
      }
      ul {
        li {
          p {
            display: none;
          }
        }
      }
      .bottom {
        p {
          display: none;
        }
      }
    }
  }
  @media screen and (max-width: 1250px) {
    & {
      width: 73px;
    }
    .content {
      width: 73px;
      .up {
        h1 {
          display: none;
        }
        .logo {
          display: block !important;
        }
      }
      ul {
        li {
          p {
            display: none;
          }
        }
      }
      .bottom {
        p {
          display: none;
        }
      }
    }
  }
  .morepanel {
    position: absolute;
    background-color: #262626;
    bottom: 56px;
    left: 4px;
    border-radius: 12px;
    overflow: hidden;
    width: 0px;
    height: 0px;
    transition: 0.1s ease-in-out height;
    padding: 0px;
    &.a {
      padding: 8px;
      width: 270px;
      height: 162px;
    }
    button,
    a {
      display: flex;
      padding: 1rem;
      p {
        display: block !important;
        margin: 0px !important;
        font-weight: 400 !important;
        font-size: 14px !important;
      }
      svg {
        width: 18px;
        height: 18px;
        margin-right: 12px;
      }
      &:hover {
        background-color: #363636;
        border-radius: 8px;
      }
    }
  }
`;
const Logo = () => (<svg className="logo" xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348">
    <title>React Logo</title>
    <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
    <g stroke="#61dafb" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>);
exports.default = Navigation;
