"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const Bottom_1 = require("./post/postpopup/Bottom");
const NotificationItem = ({ n, closepanel, }) => {
    const { id, targeturl, owner, pp, username, created, type, status } = n;
    const text = (0, react_1.useMemo)(() => ["started following you. "][type], []);
    const date = (0, react_1.useMemo)(() => (0, Bottom_1.dateCalc)(created), []);
    const s = (0, react_1.useMemo)(() => {
        if (type == null)
            return "Follow";
        if (type == 0)
            return "Requested";
        if (type == 1)
            return "Following";
        return "";
    }, [status]);
    const onc = () => { };
    return (<Container key={id}>
      <react_router_dom_1.Link to={targeturl} onClick={closepanel}>
        <img className="pp" src={pp || "/pp.jpg"} alt="pp"/>
        <pre className="text">
          <react_router_dom_1.Link to={`/${username}`}>{username}</react_router_dom_1.Link>
          {text}
          <span>{date}</span>{" "}
        </pre>
        <button className={s} onClick={onc}>
          {s}
        </button>
      </react_router_dom_1.Link>
    </Container>);
};
const Container = styled_components_1.default.li `
  white-space: nowrap;
  width: 100%;

  a {
    display: flex;
    padding: 8px 24px;
    align-items: center;
    width: 100%;
    .pp {
      width: 44px;
      height: 44px;
      border-radius: 100%;
      margin-right: 14px;
    }
    .text {
      width: 100%;
      white-space: pre-wrap;
      font-size: 14px;
      max-lines: 2;
      height: 36px;
      line-height: 18px;
      overflow: hidden;
      a {
        font-weight: 600;
        padding: 0px;
        display: inline-block;
        margin-right: 4px;
      }
      span {
        color: #a8a8a8;
      }
    }
    button {
      font-size: 14px;
      border-radius: 8px;
      padding: 7px 1rem;
      background-color: #fafafa;
      color: #000;
      margin-left: 10px;
      &.Follow {
        background-color: #0095f6;
        color: #fafafa;
      }
    }
  }
`;
exports.default = NotificationItem;
