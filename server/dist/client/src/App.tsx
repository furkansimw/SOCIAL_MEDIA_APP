import { Route, Routes, useLocation } from "react-router-dom";
import Navigation from "./components/navigation/Navigation.tsx";
import Posts from "./pages/Posts.tsx";
import Explore from "./pages/Explore.tsx";
import styled from "styled-components";
import Login from "./pages/Login.tsx";
import { shallowEqual, useSelector } from "react-redux";
import { selectProfile } from "./redux/profileReducer.ts";
import "react-toastify/dist/ReactToastify.css";
import Messages from "./pages/Messages.tsx";
import PostPage from "./pages/PostPage.tsx";
import Profile from "./pages/Profile.tsx";
import PostPopup from "./components/PostPopup.tsx";
import { selectBack } from "./redux/postsReducer.ts";
import LoginPopup from "./components/unauthorization/LoginPopup.tsx";
import EditProfile from "./pages/EditProfile.tsx";
import LoginBanner from "./components/unauthorization/LoginBanner.tsx";

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
              <Route path="/direct/inbox" element={<Messages />} />
              <Route path="/account/edit" element={<EditProfile />} />
            </>
          )}
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
