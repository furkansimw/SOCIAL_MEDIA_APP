import { useState, useEffect, useRef, MouseEvent as ME } from "react"; // with the global mouseevent to avoid collision.
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  CreatePostPopupIcon,
  ExploreIcon,
  HomeIcon,
  MessagesIcon,
  MoreIcon,
  NotificationsIcon,
  SearchIcon,
} from "./Icons";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectValues } from "../redux/profileReducer";
import SearchPanel from "./SearchPanel";
import NotificationsPanel from "./NotificationsPanel";
import { AppDispatch } from "../redux/store";
import { getMyProfile } from "../api/profile";
import CreatePostPopup from "./createpostpopup/CreatePostPopup";

export const disableRightClick = (e: ME<HTMLImageElement, MouseEvent>) =>
  e.preventDefault();

const Navigation = () => {
  const { username, pp } = useSelector(selectValues, shallowEqual);

  const [mini, setMini] = useState(false);
  const { pathname } = useLocation();
  const [panel, setPanel] = useState<null | "search" | "notifications">(null);
  const [createPostPopup, setCreatePostPopup] = useState(false);
  const [moreIconActive] = useState(false);

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
    const worker = (e: MouseEvent) => {
      const l = e.composedPath();
      if (
        !(
          searchPanelBtnRef.current &&
          notificationPanelBtnRef.current &&
          leftSideRef.current &&
          searchPanelRef.current &&
          notificationPanelRef.current
        )
      ) {
        return;
      }
      if (!panel) return;
      if (l.includes(leftSideRef.current)) return;
      if (panel == "notifications") {
        if (
          !(
            l.includes(notificationPanelBtnRef.current) ||
            l.includes(notificationPanelRef.current)
          )
        ) {
          setPanel(null);
        }
      } else {
        if (
          !(
            l.includes(searchPanelBtnRef.current) ||
            l.includes(searchPanelRef.current)
          )
        ) {
          setPanel(null);
        }
      }
    };

    window.addEventListener("click", worker);
    return () => {
      window.removeEventListener("click", worker);
    };
  }, [panel]);

  const closePanel = () => setPanel(null);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getMyProfile());
  }, []);

  const closeCreatePostPopup = () => setCreatePostPopup(false);

  return (
    <>
      <SearchPanel isActive={panel == "search"} ref={searchPanelRef} />
      <NotificationsPanel
        isActive={panel == "notifications"}
        ref={notificationPanelRef}
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
              <div onClick={() => setPanel("search")}>
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
              </Link>
            </li>
            <li
              ref={notificationPanelBtnRef}
              className={uiController("notifications") ? "active" : ""}
            >
              <div onClick={() => setPanel("notifications")}>
                <NotificationsIcon isactive={uiController("notifications")} />
                <p>Notifications</p>
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
            <button className={moreIconActive ? "active" : ""}>
              <MoreIcon isactive={moreIconActive} />
              <p>More</p>
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 360px;
  .content {
    background-color: #000;
    position: relative;
    border-right: 1px solid #262626;
    height: 100%;
    width: 100%;
    padding: 8px 12px 20px;
    display: flex;
    min-width: 48px;
    overflow: hidden;
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
      overflow: hidden;
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
