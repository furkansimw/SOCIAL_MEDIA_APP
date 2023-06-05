"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const styled_components_1 = __importDefault(require("styled-components"));
const NotFound = () => {
    return (<Container>
      <h1>Sorry, this page isn't available.</h1>
      <react_router_dom_1.Link to={"/"}>
        The link you followed may be broken, or the page may have been removed.
        Go back to <span>Home</span>.
      </react_router_dom_1.Link>
    </Container>);
};
const Container = styled_components_1.default.div `
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    margin: 1rem;
    font-size: 24px;
  }
  span {
    font-weight: 600;
    color: #e0f1ff;
  }
`;
exports.default = NotFound;
