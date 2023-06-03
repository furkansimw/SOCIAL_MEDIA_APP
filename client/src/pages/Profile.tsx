import { shallowEqual, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import {
  selectPostsProfile,
  selectProfile,
  setOffset,
} from "../redux/postsReducer";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  blockUser,
  followUser,
  getProfile,
  getProfilePosts,
} from "../api/profile";
import LoadingBox from "../components/LoadingBox";
import styled from "styled-components";
import { MoreIcon3, SettingsIcon } from "../components/Icons";
import Title from "../components/Title";
import PostMini from "../components/post/PostMini";
import NotFound from "../components/NotFound.tsx";
import { selectValues } from "../redux/profileReducer.ts";
import { disableRightClick } from "../components/Navigation.tsx";
import Priv from "../components/profile/Priv.tsx";

const Profile = () => {
  const p = useLocation().pathname.split("/");
  const username = p[1];
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector(
    (s: RootState) => selectProfile(s, username),
    shallowEqual
  );

  useEffect(() => {
    if (!profile) dispatch(getProfile(username));
    if (!profile) dispatch(getProfilePosts({ username }));
  }, [username]);

  const posts = useSelector(
    (s: RootState) => selectPostsProfile(s, username),
    shallowEqual
  );
  const { username: myusername } = useSelector(selectValues, shallowEqual);

  const listRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    if (!profile?.info) return;
    const offset = profile.info.offset || 0;
    listRef.current?.scroll({ top: offset });
  }, [profile?.info]);

  useLayoutEffect(() => {
    return () => {
      dispatch(
        setOffset({ page: username, offset: listRef.current?.scrollTop ?? 0 })
      );
    };
  }, []);

  if (!profile) return <></>;

  const { info, postsState, loading } = profile;

  if (profile.exists == false) return <NotFound />;
  if (loading || !postsState || !info) return <></>;

  const {
    followercount,
    followingcount,
    postcount,
    status,
    ispublic,
    id: userid,
    fullname,
    bio,
  } = info!;
  const statusClick = () => {
    if (status == 2) dispatch(blockUser({ a: false, userid, ispublic }));
    else {
      if (status == null) dispatch(followUser({ a: true, userid, ispublic }));
      else dispatch(followUser({ a: false, userid, ispublic }));
    }
  };

  const statusController = () => {
    if (status == null) return "Follow";
    return ["Following", "Requested", "Blocked"][status];
  };

  const ismyprofile = username == myusername;

  const k = (n: number) => {
    if (n >= 1000000000) return (n / 1000000000).toFixed(1) + "B";
    else if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    else if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return n;
  };

  const a = k(postcount);
  const b = k(followercount);
  const c = k(followingcount);

  const onScroll = (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
    const { hasmore, loading } = postsState;
    if (loading || !hasmore) return;
    const { scrollTop, scrollHeight, clientHeight } = e.target as Element;
    if (scrollTop + clientHeight + 100 >= scrollHeight) {
      const { created: date, id } = posts[posts.length - 1];
      dispatch(getProfilePosts({ username, date, id }));
    }
  };

  return (
    <Container ref={listRef}>
      <Title title={username} />
      <div className="info">
        <div className="pp">
          <img onContextMenu={disableRightClick} src={info?.pp || "/pp.jpg"} />
        </div>
        <div className="text">
          <div className="up">
            <p className="username">{username}</p>
            {ismyprofile ? (
              <>
                <button className="edit">Edit profile</button>
                <button className="settings">
                  <SettingsIcon />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={statusClick}
                  className={`state ${statusController()}`}
                >
                  {statusController()}
                </button>
                <button className="message">Message</button>
                <button className="more">
                  <MoreIcon3 />
                </button>
              </>
            )}
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
      <Priv info={info} />
      <ul onScroll={onScroll}>
        {posts.map((post) => (
          <PostMini post={post} back={username} />
        ))}
        {postsState?.loading && <LoadingBox />}
      </ul>
    </Container>
  );
};

const Container = styled.ul`
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
        button {
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
  ul {
    max-width: calc(906px + 4rem);
    width: 100%;
    padding: 2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 3px;
  }
`;

export default Profile;
