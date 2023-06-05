"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const styled_components_1 = __importDefault(require("styled-components"));
const profileReducer_1 = require("../../redux/profileReducer");
const Navigation_1 = require("../navigation/Navigation");
const TextArea = ({ textAreaIsActive, text, setText }) => {
    const { username, pp } = (0, react_redux_1.useSelector)(profileReducer_1.selectValues, react_redux_1.shallowEqual);
    const onChange = (e) => setText(e.target.value);
    return (<Container className={textAreaIsActive ? "active" : ""}>
      <div className="info">
        <img onContextMenu={Navigation_1.disableRightClick} src={pp || "/pp.jpg"} alt="pp"/>
        <p>{username}</p>
      </div>
      <textarea value={text} onChange={onChange} maxLength={1000} placeholder="Write a caption..."></textarea>
    </Container>);
};
const Container = styled_components_1.default.div `
  overflow: hidden;
  transition: 0.2s ease all;
  width: 0px;
  max-width: 400px;
  padding: 0px;
  min-width: 0px;
  &.active {
    min-width: 300px;
    padding: 1rem;
    width: 100%;
  }
  .info {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    img {
      margin-right: 12px;
      width: 2rem;
      height: 2rem;
      border-radius: 100%;
      cursor: pointer;
    }
    p {
      font-size: 14px;
      font-weight: 600;
    }
  }
  textarea {
    border: none;
    outline: none;
    background-color: transparent;
    resize: none;
    width: 100%;
    color: #fafafa;
    font-size: 1rem;
    padding-right: 4px;
    overflow-y: auto;
    height: calc(100% - 50px);
    &:hover {
      &::-webkit-scrollbar-thumb {
        background-color: #363636;
      }
      &::-webkit-scrollbar {
        background-color: #202020;
      }
    }

    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      width: 8px;
      border-radius: 8px;
      background-color: transparent;
      &:active {
        background-color: #484848;
      }
    }
  }
`;
exports.default = TextArea;
