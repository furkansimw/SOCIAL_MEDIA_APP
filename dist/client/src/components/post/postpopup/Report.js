"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const PostPopup_1 = require("../../PostPopup");
const react_redux_1 = require("react-redux");
const profileReducer_1 = require("../../../redux/profileReducer");
const Report = ({ close, process, data, }) => {
    const { id } = (0, react_redux_1.useSelector)(profileReducer_1.selectValues, react_redux_1.shallowEqual);
    const active = data.owner == id;
    return (<>
      <PostPopup_1.Bg onClick={close}/>
      <Container className="morep">
        <button onClick={close} className="b">
          Report
        </button>
        {active && (<button className="b" onClick={() => {
                process();
                close();
            }}>
            Remove
          </button>)}
        <button onClick={close}>Cancel</button>
      </Container>
    </>);
};
const Container = styled_components_1.default.div `
  border-radius: 12px;
  background-color: #262626;
  width: 400px;
  position: fixed;
  z-index: 120;
  top: calc(50% - 75px);
  left: calc(50% - 200px);
  @keyframes an {
    0% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  animation: an 0.1s ease-in-out;
  button {
    display: block;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #fafafa;
    width: 100%;
    border-top: 1px solid #363636;
    &:first-child {
      border-top: none;
    }
    &.b {
      font-weight: 600;
      color: #ed4956;
    }
  }
`;
exports.default = Report;
