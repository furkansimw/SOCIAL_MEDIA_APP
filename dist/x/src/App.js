"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const Navigation_tsx_1 = __importDefault(require("./components/navigation/Navigation.tsx"));
const Posts_1 = __importDefault(require("./pages/Posts"));
const Explore_1 = __importDefault(require("./pages/Explore"));
const styled_components_1 = __importDefault(require("styled-components"));
const Login_1 = __importDefault(require("./pages/Login"));
const react_redux_1 = require("react-redux");
const profileReducer_1 = require("./redux/profileReducer");
require("react-toastify/dist/ReactToastify.css");
const Messages_1 = __importDefault(require("./pages/Messages"));
const PostPage_1 = __importDefault(require("./pages/PostPage"));
const Profile_1 = __importDefault(require("./pages/Profile"));
const PostPopup_1 = __importDefault(require("./components/PostPopup"));
const postsReducer_1 = require("./redux/postsReducer");
const LoginPopup_tsx_1 = __importDefault(require("./components/unauthorization/LoginPopup.tsx"));
const EditProfile_tsx_1 = __importDefault(require("./pages/EditProfile.tsx"));
const LoginBanner_tsx_1 = __importDefault(require("./components/unauthorization/LoginBanner.tsx"));
const App = () => {
    const { isloggedin, loginPopupActive } = (0, react_redux_1.useSelector)(profileReducer_1.selectProfile);
    const back = (0, react_redux_1.useSelector)(postsReducer_1.selectBack, react_redux_1.shallowEqual);
    const p = (0, react_router_dom_1.useLocation)().pathname;
    return (<Container>
      {loginPopupActive && <LoginPopup_tsx_1.default />}
      {isloggedin && <Navigation_tsx_1.default />}
      <View>
        {!isloggedin && p != "/" && <LoginBanner_tsx_1.default />}
        <react_router_dom_1.Routes>
          <react_router_dom_1.Route path="/" element={isloggedin ? <Posts_1.default /> : <Login_1.default />}/>
          <react_router_dom_1.Route path="/p/:postid" element={<PostPage_1.default />}/>
          <react_router_dom_1.Route path="/:username/saved?" element={<Profile_1.default />}/>
          {isloggedin && (<>
              <react_router_dom_1.Route path="/explore" element={<Explore_1.default />}/>
              <react_router_dom_1.Route path="/direct/inbox" element={<Messages_1.default />}/>
              <react_router_dom_1.Route path="/account/edit" element={<EditProfile_tsx_1.default />}/>
            </>)}
        </react_router_dom_1.Routes>
      </View>
      {back && <PostPopup_1.default />}
    </Container>);
};
const Container = styled_components_1.default.div `
  width: 100vw;
  height: 100vh;
  display: flex;
`;
const View = styled_components_1.default.div `
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
exports.default = App;
