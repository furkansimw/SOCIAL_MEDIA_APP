"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const styled_components_1 = __importDefault(require("styled-components"));
const profileReducer_1 = require("../../redux/profileReducer");
const react_redux_2 = require("react-redux");
const Login_1 = __importDefault(require("../../pages/Login"));
const react_1 = require("react");
const LoginPopup = () => {
    (0, react_1.useEffect)(() => {
        const worker = (e) => {
            if (e.key == "Escape")
                close();
        };
        window.addEventListener("keydown", worker);
        return () => {
            window.removeEventListener("keydown", worker);
        };
    }, []);
    const postPopupActive = (0, react_redux_1.useSelector)(profileReducer_1.selectPostPopupActive);
    const dispatch = (0, react_redux_2.useDispatch)();
    const close = () => dispatch((0, profileReducer_1.toggleSetLoginPopupActive)());
    if (!postPopupActive)
        return null;
    return (<>
      <Bg onClick={close}/>
      <Container className={postPopupActive ? "active" : ""}>
        <Login_1.default />
      </Container>
    </>);
};
const Bg = styled_components_1.default.div `
  background-color: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 299;
  left: 0px;
  top: 0px;
  transition: 0.3s ease-in-out all;
`;
const Container = styled_components_1.default.div `
  position: fixed;
  z-index: 300;
  top: -400px;
  min-height: 400px;
  top: calc(50% - 200px);
  min-width: 400px;
  border-radius: 8px;
  left: calc(50% - 200px);
  overflow: hidden;
  background-color: #000;
  transition: 0.3s ease-in-out all;
  transform: scale(1);
  .login {
    border: none !important;
  }
  &.active {
    @keyframes sca {
      0% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
    animation: sca 0.1s ease-in-out;
  }
`;
exports.default = LoginPopup;
