import { DetailIcon } from "../../Icons";
import styled from "styled-components";
import { disableRightClick } from "../../Navigation";
import { shallowEqual, useSelector } from "react-redux";
import {
  selectBack,
  selectCurrentPost,
  selectProfile,
} from "../../../redux/postsReducer";
import LinkQ from "../LinkQ";
import { selectValues } from "../../../redux/profileReducer";
import { RootState } from "../../../redux/store";
import { useState } from "react";
import Context from "../../Context";

const Info = () => {
  const back = useSelector(selectBack, shallowEqual);
  const { username, pp } = useSelector(selectCurrentPost, shallowEqual)!;
  const { username: myusername } = useSelector(selectValues, shallowEqual);
  const profile = useSelector(
    (s: RootState) => selectProfile(s, username),
    shallowEqual
  )!;
  const post = useSelector(selectCurrentPost, shallowEqual);
  const to = `/${username}`;
  const isfollowing = profile?.info?.status == 0;
  const [p, _p] = useState(false);
  return (
    <InfoContainer>
      <div className="l">
        <LinkQ className="pp" to={to}>
          <img
            onContextMenu={disableRightClick}
            src={pp || "/pp.jpg"}
            alt="pp"
          />
        </LinkQ>
        <LinkQ className="username" to={to}>
          <p>{username}</p>
        </LinkQ>
        {username != myusername && !isfollowing && back != "home" && (
          <>
            <span>•</span>
            <button>Follow</button>
          </>
        )}
      </div>
      <button onClick={() => _p(true)} className="d">
        <DetailIcon />
      </button>
      {p && <Context post={post} close={() => _p(false)} />}
    </InfoContainer>
  );
};
const InfoContainer = styled.div`
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

export default Info;
