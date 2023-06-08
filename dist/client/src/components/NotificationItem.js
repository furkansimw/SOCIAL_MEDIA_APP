"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const Bottom_1 = require("./post/postpopup/Bottom");
const NotificationItem = ({ n, closepanel, onc, }) => {
    const { id, url, pp, username, created, type, status, text } = n;
    console.log(n);
    const viewtext = (0, react_1.useMemo)(() => [
        "started following you. ",
        "",
        "liked your post. ",
        `commented on your post: ${text} `,
    ][typeof type == "object" ? 3 : type], []);
    const date = (0, react_1.useMemo)(() => (0, Bottom_1.dateCalc)(created), []);
    const s = (0, react_1.useMemo)(() => {
        if (status == null)
            return "Follow";
        if (status == 0)
            return "Following";
        if (status == 1)
            return "Requested";
        return "";
    }, [status]);
    return (<Container key={id}>
      <react_router_dom_1.Link to={type == 0 ? `/${username}` : `/p/${url}`} onClick={() => closepanel()}>
        <img className="pp" src={pp || "/pp.jpg"} alt="pp"/>
        <pre className="text">
          <react_router_dom_1.Link to={`/${username}`}>{username}</react_router_dom_1.Link>
          {viewtext}
          <span>{date}</span>
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
    align-items: start;
    width: 366px;
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
      line-height: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      a {
        font-weight: 600;
        padding: 0px;
        display: inline-block;
        margin-right: 4px;
        width: min-content;
      }
      span {
        color: #a8a8a8;
        font-size: 12px;
      }
    }
    button {
      min-width: 94px;
      margin-top: 3px;
      font-size: 14px;
      border-radius: 8px;
      padding: 7px 1rem;
      background-color: #fafafa;
      color: #000;
      margin-left: 10px;
      font-weight: 600;
      &.Follow {
        background-color: #0095f6;
        color: #fafafa;
      }
    }
  }
`;
exports.default = NotificationItem;
