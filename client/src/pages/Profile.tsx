import { shallowEqual, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { selectPostsProfile, selectProfile } from "../redux/postsReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile, getProfilePosts } from "../api/profile";
import LoadingBox from "../components/LoadingBox";
import styled from "styled-components";
import { MoreIcon2 } from "../components/Icons";
import Title from "../components/Title";
import PostMini from "../components/post/PostMini";

const Profile = () => {
  const p = useLocation().pathname.split("/");
  const _username = p[1];
  const dispatch = useDispatch<AppDispatch>();
  let profile = useSelector(selectProfile, shallowEqual);

  useEffect(() => {
    if (!profile) dispatch(getProfile(_username));
    if (!profile) dispatch(getProfilePosts({ username: _username, offset: 0 }));
  }, [_username]);

  const posts = useSelector(selectPostsProfile, shallowEqual);

  if (!profile) return <></>;

  const { info, username } = profile;

  const statusController = () => {
    if (info?.status == null) return "Follow";
  };

  if (profile.loading || profile.postsState?.loading) return <></>;

  return (
    <Container>
      <Title title={username} />
      <div className="info">
        <div className="pp">
          <img src={info?.pp || "/pp.jpg"} />
        </div>
        <div className="text">
          <div className="up">
            <p>{username}</p>
            <button className="state">{statusController()}</button>
            <button className="more">
              <MoreIcon2 />
            </button>
          </div>
          <div className="details"></div>
        </div>
      </div>
      <ul>
        {posts.map((post) => (
          <PostMini post={post} />
        ))}
        {profile.postsState?.loading && <LoadingBox />}
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
    background-color: transparent;
    &.more {
      svg {
        fill: #fafafa;
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
