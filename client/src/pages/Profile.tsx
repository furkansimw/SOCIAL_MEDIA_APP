import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { selectProfile } from "../redux/postsReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "../api/profile";

const Profile = () => {
  const p = useLocation().pathname.split("/");
  const username = p[1];
  const issaved = p[2] == "saved";
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((s: RootState) => selectProfile(s, username));

  useEffect(() => {
    if (profile) dispatch(getProfile(username));
  }, [username]);

  return (
    <div>
      <div className="info"></div>
      <ul></ul>
    </div>
  );
};

export default Profile;
