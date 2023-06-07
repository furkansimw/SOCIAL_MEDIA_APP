"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const styled_components_1 = __importDefault(require("styled-components"));
const profileReducer_1 = require("../../redux/profileReducer");
const LoginBanner = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const tap = () => dispatch((0, profileReducer_1.toggleSetLoginPopupActive)());
    return (<Container>
      <div className="content">
        <h1>Social Media App</h1>
        <button onClick={tap}>Login</button>
      </div>
    </Container>);
};
const Container = styled_components_1.default.div `
  width: 100%;
  justify-content: center;
  display: flex;
  position: absolute;
  align-items: center;
  bottom: 0rem;
  z-index: 5560;
  .content {
    border-radius: 22px 22px 0px 0px;
    padding: 2rem;
    background-color: #000;
    max-width: 940px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    h1 {
      font-size: 24px;
      font-weight: 600;
    }
    button {
      padding: 7px 1rem;
      border-radius: 8px;
      color: #fafafa;
      font-size: 14px;
      cursor: pointer;
      background-color: #0095f6;
      &:hover {
        opacity: 0.7;
      }
    }
  }
`;
exports.default = LoginBanner;
