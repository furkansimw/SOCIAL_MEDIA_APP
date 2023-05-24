import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  CreatePostPopupIcon,
  ExploreIcon,
  HomeIcon,
  MessagesIcon,
  NotificationsIcon,
  SearchIcon,
} from "./Icons";
import { useSelector } from "react-redux";
import { selectProfileValues } from "../redux/profileSlice";

const Navigation = () => {
  const { username, pp } = useSelector(selectProfileValues);

  const [mini, setMini] = useState(false);
  const { pathname } = useLocation();
  const [panel, setPanel] = useState<null | "search" | "notifications">(null);
  const [createPostPopup, setCreatePostPopup] = useState(false);

  const closePanel = () => setPanel(null);

  const uiController = (key: string) => {
    if (createPostPopup) return key == "create";
    if (panel) {
      if (panel == "search") return key == "search";
      if (panel == "notifications") return key == "notifications";
    }
    return key == pathname;
  };

  return (
    <Container className={mini ? "mini" : ""}>
      <div className="content">
        <div className="up">
          <Link to={"/"}>
            <h1>Social Media App</h1>
            <Logo />
          </Link>
        </div>
        <ul>
          <li
            onClick={closePanel}
            className={uiController("/") ? "active" : ""}
          >
            <Link to={"/"}>
              <HomeIcon isactive={uiController("/")} />
              <p>Home</p>
            </Link>
          </li>
          <li className={uiController("search") ? "active" : ""}>
            <div onClick={() => setPanel("search")}>
              <SearchIcon isactive={uiController("search")} />
              <p>Search</p>
            </div>
          </li>
          <li
            onClick={closePanel}
            className={uiController("/explore") ? "active" : ""}
          >
            <Link to={"/explore"}>
              <ExploreIcon isactive={uiController("/explore")} />
              <p>Explore</p>
            </Link>
          </li>
          <li
            onClick={closePanel}
            className={uiController("/direct/inbox") ? "active" : ""}
          >
            <Link to={"/direct/inbox"}>
              <MessagesIcon isactive={uiController("/direct/inbox")} />
              <p>Messages</p>
            </Link>
          </li>
          <li className={uiController("notifications") ? "active" : ""}>
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
          <li
            onClick={closePanel}
            className={uiController(`/${username}`) ? "active" : ""}
          >
            <Link to={`/${username}`}>
              <img src={pp || "/pp.jpg"} alt="pp" />
              <p>Profile</p>
            </Link>
          </li>
        </ul>
        <div className="bottom"></div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  transition: 0.3s ease-in-out width;
  width: 360px;
  .content {
    height: 100%;
    border-right: 1px solid #262626;
    width: 100%;
    padding: 8px 12px 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .up {
      display: block;
      padding: 25px 12px 12px;
      width: 100%;
      margin-bottom: 19px;
      h1 {
        font-size: 24px;
        height: 36px;
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
      }
    }
    ul {
      height: 100%;
      li {
        margin: 2px 0px;
        a,
        div {
          cursor: pointer;
          border-radius: 8px;
          padding: 12px;
          display: flex;
          align-items: center;
          transition: 0.2s ease all;
          transition-delay: 0.1s;
          svg {
          }
          p {
            margin-left: 10px;
          }
          &:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }
        }
      }
    }
  }
  &.mini {
    width: 72px;
    .up {
      h1 {
        display: none;
      }
      .logo {
        display: block !important;
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
