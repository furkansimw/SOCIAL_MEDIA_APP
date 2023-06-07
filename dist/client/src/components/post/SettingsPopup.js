"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const PostPopup_1 = require("../PostPopup");
const styled_components_1 = __importDefault(require("styled-components"));
const SettingsPopup = ({ close }) => {
    return (<>
      <PostPopup_1.Bg onClick={close}/>
      <Container className={mypost ? "my" : ""}>
        {mypost && (<button onClick={remove} className="r">
            Remove
          </button>)}
        <button></button>
        <button onClick={close}>Cancel</button>
      </Container>
    </>);
};
const Container = styled_components_1.default.div ``;
exports.default = SettingsPopup;
