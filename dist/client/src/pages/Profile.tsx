import { shallowEqual, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import {
  selectPostsProfile,
  selectProfile,
  setOffset,
} from "../redux/postsReducer";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  blockUser,
  followUser,
  getProfile,
  getProfilePosts,
} from "../api/profile";
import LoadingBox from "../components/LoadingBox";
import styled from "styled-components";
import { MoreIcon3 } from "../components/Icons";
import Title from "../components/Title";
import PostMini from "../components/post/PostMini";
import NotFound from "../components/profile/NotFound.tsx";
import {
  selectIsLoggedin,
  selectValues,
  toggleSetLoginPopupActive,
} from "../redux/profileReducer.ts";
import { disableRightClick } from "../components/navigation/Navigation.tsx";
import Priv from "../components/profile/Priv.tsx";
import UnfollowPopup from "./UnfollowPopup.tsx";
import Views from "../components/profile/View.tsx";

const Profile = () => {
  const isloggedin = useSelector(selectIsLoggedin, shallowEqual);
  const p = useLocation().pathname.split("/");
  const username = p[1];
  const [block, setBlock] = useState([false, false]);

  const [more, setMore] = useState(false);
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
    if (!profile?.info || listRef.current == null) return;

    const offset = profile.info.offset || 0;

    listRef.current?.scroll({ top: offset });
    return () => {
      dispatch(
        setOffset({ page: username, offset: listRef.current?.scrollTop ?? 0 })
      );
    };
  }, []);
  const [unfollowpopupx, setUnfollowpopupx] = useState<{
    active: boolean;
    pp: string | null;
    username: string;
  }>({
    active: false,
    pp: null,
    username: "",
  });

  const [viewC, setViewC] = useState<"followings" | "followers" | null>(null);
  const closeViewC = () => setViewC(null);
  const closeUnfollowpostpopup = () =>
    setUnfollowpopupx({ active: false, username: "", pp: null });

  if (!profile) return <></>;

  const { postsState, loading } = profile;

  if (profile.exists == false) return <NotFound />;

  if (loading || !postsState || !profile.info) return <></>;
  const { info } = profile;
  const {
    followercount,
    followingcount,
    postcount,
    status,
    id: userid,
    ispublic,
    fullname,
    bio,
    pp,
  } = info!;

  const statusClick = () => {
    if (!isloggedin) return dispatch(toggleSetLoginPopupActive());

    if (status == 1 && !ispublic)
      setUnfollowpopupx({ active: true, pp, username });
    else if (status == 2) setBlock([true, false]);
    else {
      if (status == null) dispatch(followUser({ a: true, userid }));
      else dispatch(followUser({ a: false, userid }));
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
  const process = () => dispatch(followUser({ a: false, userid }));

  const message = () => {
    if (!isloggedin) dispatch(toggleSetLoginPopupActive());
    // todo
  };

  const viewfollowing = () => {
    if (!isloggedin) return dispatch(toggleSetLoginPopupActive());
    setViewC("followings");
  };

  const viewfollowers = () => {
    if (!isloggedin) return dispatch(toggleSetLoginPopupActive());
    setViewC("followers");
  };

  return (
    <Container onScroll={onScroll} ref={listRef}>
      <Title title={username} />
      {viewC && <Views quit={closeViewC} type={viewC} userid={userid} />}
      {unfollowpopupx.active && (
        <UnfollowPopup
          data={{ pp, username }}
          close={closeUnfollowpostpopup}
          process={process}
        />
      )}
      <div className="info">
        <div className="pp">
          <img onContextMenu={disableRightClick} src={info?.pp || "/pp.jpg"} />
        </div>
        <div className="text">
          <div className="up">
            <p className="username">{username}</p>
            {ismyprofile ? (
              <>
                <Link to={`/account/edit`} className="edit">
                  Edit profile
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={statusClick}
                  className={`state ${statusController()}`}
                >
                  {statusController()}
                </button>
                <button className="message" onClick={message}>
                  Message
                </button>
                <button className="more" onClick={() => setMore(true)}>
                  <MoreIcon3 />
                </button>
              </>
            )}
          </div>
          <div className="details">
            <p>
              <span>{a}</span> posts
            </p>
            <p onClick={viewfollowers}>
              <span>{b}</span> followers
            </p>
            <p onClick={viewfollowing}>
              <span>{c}</span> following
            </p>
          </div>
          {fullname && <div className="fullname">{fullname}</div>}
          {bio && <pre className="bio">{bio}</pre>}
        </div>
      </div>
      <Priv info={info} />
      {block[0] && (
        <Block
          close={() => setBlock([false, false])}
          username={username}
          state={block[1]}
          userid={userid}
        />
      )}
      {more && (
        <More
          close={() => setMore(false)}
          procces={() => setBlock([true, true])}
        />
      )}
      <ul>
        {posts.map((post) => (
          <PostMini key={post.id} post={post} back={username} />
        ))}
      </ul>
      {postsState?.loading && <LoadingBox />}
    </Container>
  );
};

const Block = ({
  state,
  username,
  close,
  userid,
}: {
  state: boolean;
  close: () => void;
  username: string;
  userid: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const tap = () => {
    dispatch(blockUser({ a: state, userid }));
    close();
  };

  return (
    <>
      <Bg onClick={close} />
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
    </>
  );
};

const More = ({
  close,
  procces,
}: {
  close: () => void;
  procces: () => void;
}) => {
  return (
    <>
      <Bg onClick={close} />
      <div className="morep">
        <button
          onClick={() => {
            close();

            procces();
          }}
          className="b"
        >
          Block
        </button>
        <button onClick={close}>Cancel</button>
      </div>
    </>
  );
};

const Bg = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  left: 0px;
  top: 0px;
`;

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
            &.Blocked {
              color: #ed4956;
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
    top: calc(50% - 50px);
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

export default Profile;
