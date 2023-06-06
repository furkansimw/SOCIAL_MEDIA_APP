"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const react_router_dom_1 = require("react-router-dom");
const NotificationItem = ({ n }) => {
    const { id, targeturl, owner, pp, username, created, type } = n;
    // const text = useMemo(()=>['F'], []);
    return (<Container key={id}>
      <react_router_dom_1.Link to={targeturl}>
        <img className="pp" src={pp || "/pp.jpg"} alt="pp"/>
        <pre className="text">
          <react_router_dom_1.Link to={`/${username}`}>{username}</react_router_dom_1.Link>
          {type}
        </pre>
      </react_router_dom_1.Link>
    </Container>);
};
const Container = styled_components_1.default.li `
  white-space: nowrap;
  a {
    display: flex;
    .pp {
      width: 44px;
      height: 44px;
      border-radius: 100%;
      margin-right: 14px;
    }
    .text {
    }
  }
`;
exports.default = NotificationItem;
