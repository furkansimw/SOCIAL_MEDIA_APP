"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const DiscardPopup = ({ discard, cancel }) => {
    return (<>
      <Bg onClick={discard}/>
      <Container>
        <div className="text">
          <h1>Discard post?</h1>
          <h2>If you leave, your edits won't be saved.</h2>
        </div>
        <div className="buttons">
          <button onClick={discard} className="discard">
            Discard
          </button>
          <button onClick={cancel}>Cancel</button>
        </div>
      </Container>
    </>);
};
const Bg = styled_components_1.default.div `
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
  position: fixed;
  cursor: pointer;
`;
const Container = styled_components_1.default.div `
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 200;
  transform: translate(-50%, -50%);
  background-color: #262626;
  width: 400px;
  border-radius: 12px;
  overflow: hidden;
  .text {
    padding: 2rem;
    h1,
    h2 {
      text-align: center;
    }
    h1 {
      margin-bottom: 4px;
      font-size: 20px;
      line-height: 24px;
      font-weight: 400;
    }
    h2 {
      font-size: 14px;
      line-height: 18px;
      font-weight: 400;
      color: #a8a8a8;
    }
  }
  .buttons {
    button {
      display: block;
      width: 100%;
      border: none;
      font-size: 14px;
      height: 44px;
      background-color: transparent;
      color: #fafafa;
      border-top: 1px solid #363636;
      &.discard {
        font-weight: 700;
        color: #ed4956;
      }
    }
  }
`;
exports.default = DiscardPopup;
