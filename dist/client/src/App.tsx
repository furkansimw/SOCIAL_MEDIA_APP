import { Route, Routes, useLocation } from "react-router-dom";
import Navigation from "./components/navigation/Navigation.tsx";
import Posts from "./pages/Posts";
import Explore from "./pages/Explore";
import styled from "styled-components";
import Login from "./pages/Login";
import { shallowEqual, useSelector } from "react-redux";
import { selectProfile } from "./redux/profileReducer";
import "react-toastify/dist/ReactToastify.css";
import Messages from "./pages/Messages";
import PostPage from "./pages/PostPage";
import Profile from "./pages/Profile";
import PostPopup from "./components/PostPopup";
import { selectBack } from "./redux/postsReducer";
import LoginPopup from "./components/unauthorization/LoginPopup.tsx";
import EditProfile from "./pages/EditProfile.tsx";
import LoginBanner from "./components/unauthorization/LoginBanner.tsx";
import NotFound from "./components/profile/NotFound.tsx";

const App = () => {
  const { isloggedin, loginPopupActive } = useSelector(selectProfile);
  const back = useSelector(selectBack, shallowEqual);
  const p = useLocation().pathname;
  return (
    <Container>
      {loginPopupActive && <LoginPopup />}
      {isloggedin && <Navigation />}
      <View>
        {!isloggedin && p != "/" && <LoginBanner />}
        <Routes>
          <Route path="/" element={isloggedin ? <Posts /> : <Login />} />
          <Route path="/p/:postid" element={<PostPage />} />
          <Route path="/:username/saved?" element={<Profile />} />
          {isloggedin && (
            <>
              <Route path="/explore" element={<Explore />} />
              <Route
                path="/direct/inbox/:messagegroupid?"
                element={<Messages />}
              />
              <Route path="/account/edit" element={<EditProfile />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </View>
      {back && <PostPopup />}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const View = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export default App;
