import React from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Posts from "./pages/Posts";
import Explore from "./pages/Explore";
import styled from "styled-components";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { selectProfile } from "./redux/profileSlice";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { isloggedin } = useSelector(selectProfile);
  return (
    <Container>
      {isloggedin && <Navigation />}
      <View>
        <Routes>
          <Route path="/" element={isloggedin ? <Posts /> : <Login />} />
          {isloggedin && <Route path="/explore" element={<Explore />} />}
        </Routes>
      </View>
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
  align-items: center;
`;

export default App;
