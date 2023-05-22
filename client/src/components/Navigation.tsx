import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navigation = () => {
  const [mini, setMini] = useState(false);
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
          <li>
            <Link to={"/"}>
              <p>icon</p>
              <p>Home</p>
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
        a {
          padding: 12px;
          display: flex;
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
    <g stroke="#61dafb" stroke-width="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

export default Navigation;
