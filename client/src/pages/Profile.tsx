import { shallowEqual, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { selectPostsProfile, selectProfile } from "../redux/postsReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile, getProfilePosts } from "../api/profile";
import LoadingBox from "../components/LoadingBox";
import styled from "styled-components";
import { MoreIcon3 } from "../components/Icons";
import Title from "../components/Title";
import PostMini from "../components/post/PostMini";
import NotFound from "../components/NotFound.tsx";

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

  if (!profile) return <></>;

  const { info } = profile;
  const statusController = () => {
    if (info?.status == null) return "Follow";
  };

  if (profile.exists == false) return <NotFound />;
  if (profile.loading || !profile.postsState || !profile.info) return <></>;

  const { followercount, followingcount, postcount } = info!;

  return (
    <Container>
      <Title title={username} />
      <div className="info">
        <div className="pp">
          <img src={info?.pp || "/pp.jpg"} />
        </div>
        <div className="text">
          <div className="up">
            <p className="username">{username}</p>
            <button className={`state ${statusController()}`}>
              {statusController()}
            </button>
            <button className="message">Message</button>
            <button className="more">
              <MoreIcon3 />
            </button>
          </div>
          <div className="details">
            <p>
              <span>{postcount}</span> posts
            </p>
            <p>
              <span>{followercount}</span> posts
            </p>
            <p>
              <span>{followingcount}</span> posts
            </p>
          </div>
        </div>
      </div>
      <ul>
        {posts.map((post) => (
          <PostMini post={post} back={username} />
        ))}
        {profile.postsState.loading && <LoadingBox />}
      </ul>
    </Container>
  );
};

const Container = styled.div`
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
  }

  .info {
    display: flex;
    max-width: calc(906px + 4rem);
    align-items: center;
    padding: 4rem;
    justify-content: start;
    width: 100%;
    @media screen and (max-width: 800px) {
      .pp,
      img {
        min-width: 120px !important;
        max-width: 120px !important;
        min-height: 120px !important;
        max-height: 120px !important;
      }
    }
    .pp {
      min-width: 150px;
      max-width: 300px;
      width: 100%;
      height: 150px;
      margin-right: 2rem;
      display: flex;
      justify-content: center;
      img {
        min-width: 150px;
        height: 150px;
        object-fit: cover;
        border-radius: 100%;
      }
    }
    .text {
      height: 100%;
      width: 100%;
      .up {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        .username {
          font-size: 20px;
          margin-right: 2rem;
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
