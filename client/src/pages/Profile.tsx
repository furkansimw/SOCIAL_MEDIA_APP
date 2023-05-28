import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { selectProfile } from "../redux/postsReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "../api/profile";
import LoadingBox from "../components/LoadingBox";
import styled from "styled-components";
import { MoreIcon, MoreIcon2 } from "../components/Icons";

const Profile = () => {
  const p = useLocation().pathname.split("/");
  const _username = p[1];
  const issaved = p[2] == "saved";
  const dispatch = useDispatch<AppDispatch>();
  let profile = useSelector((s: RootState) => selectProfile(s, _username));

  useEffect(() => {
    if (!profile) dispatch(getProfile(_username));
  }, [_username]);

  if (!profile) return;
  const { info, username } = profile;

  const statusController = () => {
    if (info?.status == null) return "Follow";
  };

  if (profile.loading) return <LoadingBox />;

  return (
    <Container>
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
          <div className="details">{/* <p>{postcount}</p> */}</div>
        </div>
      </div>
      {profile.postsState?.loading && <ul></ul>}
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
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
  }
`;

export default Profile;
