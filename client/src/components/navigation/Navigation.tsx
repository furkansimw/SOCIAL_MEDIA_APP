import {
  useState,
  useEffect,
  useRef,
  MouseEvent as ME,
  forwardRef,
} from "react"; // with the global mouseevent to avoid collision.
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  CreatePostPopupIcon,
  ExploreIcon,
  HomeIcon,
  MessagesIcon,
  MoreIcon,
  NotificationsIcon,
  SavedIcon,
  SearchIcon,
  SettingsIcon,
} from "../Icons";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectValues, setUpdateValues } from "../../redux/profileReducer";
import SearchPanel from "./SearchPanel";
import NotificationsPanel from "./NotificationsPanel";
import { AppDispatch } from "../../redux/store";
import { getMyProfile } from "../../api/profile";
import CreatePostPopup from "../createpostpopup/CreatePostPopup";
import { logout } from "../../api/auth";
import socket from "../../api/socket/socket";
import { panelViewController } from "./Functions";

export const disableRightClick = (e: ME<HTMLImageElement, MouseEvent>) =>
  e.preventDefault();

const Navigation = () => {
  const [mini, setMini] = useState(false);
  const { pathname } = useLocation();
  const [panel, setPanel] = useState<null | "search" | "notifications">(null);
  const [createPostPopup, setCreatePostPopup] = useState(false);

  const uiController = (key: string) => {
    if (createPostPopup) return key == "create";
    if (panel) {
      if (panel == "search") return key == "search";
      if (panel == "notifications") return key == "notifications";
    }
    return key == pathname;
  };

  useEffect(() => {
    setMini(panel != null);
  }, [panel]);

  const searchPanelBtnRef = useRef<HTMLLIElement>(null),
    notificationPanelBtnRef = useRef<HTMLLIElement>(null),
    leftSideRef = useRef<HTMLDivElement>(null),
    searchPanelRef = useRef<HTMLDivElement>(null),
    notificationPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("click", (e) =>
      panelViewController(
        e,
        searchPanelBtnRef,
        notificationPanelBtnRef,
        leftSideRef,
        searchPanelRef,
        notificationPanelRef,
        panel,
        setPanel
      )
    );
    return () => {
      window.removeEventListener("click", (e) =>
        panelViewController(
          e,
          searchPanelBtnRef,
          notificationPanelBtnRef,
          leftSideRef,
          searchPanelRef,
          notificationPanelRef,
          panel,
          setPanel
        )
      );
    };
  }, [panel]);

  const closePanel = () => setPanel(null);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // @ts-ignore
    dispatch(getMyProfile());
  }, []);

  const closeCreatePostPopup = () => setCreatePostPopup(false);

  const moreBtnRef = useRef<HTMLButtonElement>(null);
  const morePanelRef = useRef<HTMLDivElement>(null);
  const [moreIconActive, setMoreIconActive] = useState(false);

  useEffect(() => {
    const worker = (e: MouseEvent) => {
      const p = e.composedPath();
      if (!moreBtnRef.current || !morePanelRef.current) return;
      if (p.includes(moreBtnRef.current)) {
        setMoreIconActive((p) => !p);
      } else if (p.includes(morePanelRef.current)) {
        setMoreIconActive(true);
      } else {
        setMoreIconActive(false);
      }
    };

    window.addEventListener("click", worker);

    return () => {
      window.removeEventListener("click", worker);
    };
  }, []);

  const [newNotification, setNewNotification] = useState(false);

  const [notificationsHas, setNotificationsHas] = useState(false);

  const {
    username,
    pp,
    id,
    ncreatedcommentcount,
    npostlikescount,
    nreqcount,
    reqcount,
    unreadmessagescount,
  } = useSelector(selectValues, shallowEqual);

  useEffect(() => {
    socket.on("notifications", (type) => {
      setNewNotification(true);
      setNotificationsHas(true);
      if ([0, 1].includes(type))
        dispatch(setUpdateValues({ nreqcount: nreqcount + 1 }));
      else if (type == 2)
        dispatch(setUpdateValues({ npostlikescount: npostlikescount + 1 }));
      else
        dispatch(
          setUpdateValues({ ncreatedcommentcount: ncreatedcommentcount + 1 })
        );
    });
  }, [nreqcount, ncreatedcommentcount, npostlikescount]);

  const timeoutIdRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);

    timeoutIdRef.current = setTimeout(() => setNewNotification(false), 4000);

    return () => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    };
  }, [newNotification]);

  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  useEffect(() => {
    setNotificationsHas(
      ncreatedcommentcount > 0 || npostlikescount > 0 || nreqcount > 0
    );
    setUnreadMessagesCount(unreadmessagescount);
    setNewNotification(
      ncreatedcommentcount > 0 || npostlikescount > 0 || nreqcount > 0
    );
  }, [ncreatedcommentcount, unreadmessagescount, npostlikescount, nreqcount]);

  useEffect(() => {
    if (panel == "notifications") {
      dispatch(
        setUpdateValues({
          ncreatedcommentcount: 0,
          nreqcount: 0,
          npostlikescount: 0,
        })
      );
    }
  }, [panel]);

  const closepanel = () => setPanel(null);

  return (
    <>
      <SearchPanel
        close={closePanel}
        isActive={panel == "search"}
        ref={searchPanelRef}
      />
      <NotificationsPanel
        isActive={panel == "notifications"}
        ref={notificationPanelRef}
        closepanel={closepanel}
      />
      {createPostPopup && <CreatePostPopup close={closeCreatePostPopup} />}
      <Container className={mini ? "mini" : ""}>
        <div className="content" ref={leftSideRef}>
          <div className="up">
            <Link onClick={closePanel} to={"/"}>
              <h1>Social Media App</h1>
              <Logo />
            </Link>
          </div>
          <ul>
            <li className={uiController("/") ? "active" : ""}>
              <Link onClick={closePanel} to={"/"}>
                <HomeIcon isactive={uiController("/")} />
                <p>Home</p>
              </Link>
            </li>
            <li
              ref={searchPanelBtnRef}
              className={uiController("search") ? "active" : ""}
            >
              <div
                onClick={() => setPanel(panel == "search" ? null : "search")}
              >
                <SearchIcon isactive={uiController("search")} />
                <p>Search</p>
              </div>
            </li>
            <li className={uiController("/explore") ? "active" : ""}>
              <Link onClick={closePanel} to={"/explore"}>
                <ExploreIcon isactive={uiController("/explore")} />
                <p>Explore</p>
              </Link>
            </li>
            <li className={uiController("/direct/inbox") ? "active" : ""}>
              <Link onClick={closePanel} to={"/direct/inbox"}>
                <MessagesIcon isactive={uiController("/direct/inbox")} />
                <p>Messages</p>
                {unreadMessagesCount > 0 && (
                  <div className="circle">
                    <p>{unreadMessagesCount}</p>
                  </div>
                )}
              </Link>
            </li>
            <li
              ref={notificationPanelBtnRef}
              className={uiController("notifications") ? "active" : ""}
            >
              <div
                onClick={() =>
                  setPanel(panel == "notifications" ? null : "notifications")
                }
              >
                <NotificationsIcon isactive={uiController("notifications")} />
                <p>Notifications</p>
                {notificationsHas && <div className="circle"></div>}
                {newNotification && (
                  <div className={`newnotif`}>
                    {nreqcount > 0 && (
                      <span>
                        <div className="icon people"></div>
                        <p>{nreqcount}</p>
                      </span>
                    )}
                    {npostlikescount > 0 && (
                      <span>
                        <div className="icon post"></div>
                        <p>{npostlikescount}</p>
                      </span>
                    )}
                    {ncreatedcommentcount > 0 && (
                      <span>
                        <div className="icon comment"></div>
                        <p>{ncreatedcommentcount}</p>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </li>
            <li className={uiController("create") ? "active" : ""}>
              <div onClick={() => setCreatePostPopup(true)}>
                <CreatePostPopupIcon isactive={uiController("create")} />
                <p>Create</p>
              </div>
            </li>
            <li className={uiController(`/${username}`) ? "active" : ""}>
              <Link onClick={closePanel} to={`/${username}`}>
                <img
                  onContextMenu={disableRightClick}
                  src={pp || "/pp.jpg"}
                  alt="pp"
                />
                <p>Profile</p>
              </Link>
            </li>
          </ul>
          <div className="bottom">
            <button ref={moreBtnRef} className={moreIconActive ? "active" : ""}>
              <MoreIcon isactive={moreIconActive} />
              <p>More</p>
              <MorePanel moreIconActive={moreIconActive} ref={morePanelRef} />
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

const MorePanel = forwardRef<HTMLDivElement, { moreIconActive: boolean }>(
  ({ moreIconActive }, ref) => {
    const myusername = useSelector(selectValues, shallowEqual).username;
    return (
      <div ref={ref} className={`morepanel ${moreIconActive ? "a" : ""}`}>
        <Link to={`/account/edit`}>
          <SettingsIcon />
          <p>Settings</p>
        </Link>
        <Link to={`/${myusername}/saved`}>
          <SavedIcon />
          <p>Saved</p>
        </Link>
        <button onClick={logout}>
          <p>Logout</p>
        </button>
      </div>
    );
  }
);

const Container = styled.div`
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

const Logo = () => (
  <svg
    className="logo"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-11.5 -10.23174 23 20.46348"
  >
    <title>React Logo</title>
    <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
    <g stroke="#61dafb" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

export default Navigation;
