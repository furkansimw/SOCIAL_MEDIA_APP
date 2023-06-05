"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const react_router_dom_1 = require("react-router-dom");
const NotificationItem = ({ n }) => {
    const { id, targeturl } = n;
    return (<Container key={id}>
      <react_router_dom_1.Link to={targeturl}></react_router_dom_1.Link>
    </Container>);
};
const Container = styled_components_1.default.li ``;
exports.default = NotificationItem;
