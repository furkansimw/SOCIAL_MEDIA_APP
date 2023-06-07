"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const FollowRequests = ({ isActive }) => {
    return (<Container className={isActive ? "a" : ""}>
      <h1>Fr</h1>
    </Container>);
};
const Container = styled_components_1.default.ul `
  width: 100%;
  overflow: hidden;
  height: 100%;
  overflow-y: auto;
  background-color: red;
  transition: 0.3s ease-in-out all;
`;
exports.default = FollowRequests;
