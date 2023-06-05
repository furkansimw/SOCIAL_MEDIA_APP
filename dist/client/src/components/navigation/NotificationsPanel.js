"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const styled_components_1 = __importDefault(require("styled-components"));
const LoadingBox_1 = __importDefault(require("../LoadingBox"));
const NotificationItem_1 = __importDefault(require("../NotificationItem"));
const profile_1 = require("../../api/profile");
const NotificationsPanel = (0, react_1.forwardRef)(({ isActive }, ref) => {
    (0, react_1.useEffect)(() => {
        if (isActive) {
            setLoading(true);
            (0, profile_1.notificationsGet)({})
                .then((r) => {
                setNotifications(r);
                setHasmore(r.length == 12);
            })
                .catch(() => setHasmore(false))
                .finally(() => setLoading(false));
        }
    }, [isActive]);
    const [notifications, setNotifications] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [hasmore, setHasmore] = (0, react_1.useState)(true);
    const onScroll = (e) => {
        e.preventDefault();
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (!hasmore || loading)
            return;
        if (scrollTop + 100 + clientHeight >= scrollHeight) {
        }
    };
    return (<Container className={isActive ? "active" : ""} ref={ref}>
        <div className="upside">
          <h1>Notifications</h1>
        </div>
        <ul onScroll={onScroll}>
          {notifications.map((n) => {
            return <NotificationItem_1.default key={n.id} n={n}/>;
        })}
          {loading && <LoadingBox_1.default />}
        </ul>
      </Container>);
});
const Container = styled_components_1.default.div `
  position: absolute;
  width: 440px;
  height: 100vh;
  left: -440px;
  top: 0px;
  background-color: #000;
  transition: 0.3s ease-in-out all;
  padding-left: 73px;
  border-right: 1px solid #262626;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
  border-radius: 0px 1rem 1rem 0px;
  z-index: 10;
  overflow: hidden;
  &.active {
    left: 0px;
  }
  .upside {
    padding: 24px;
    h1 {
      font-size: 24px;
      line-height: 28px;
    }
  }
  ul {
    height: calc(100% - 80px);
    overflow-y: auto;
    padding: 0px 24px;
    &::-webkit-scrollbar {
      width: 8px;
      background-color: #101010;
    }
    &::-webkit-scrollbar-thumb {
      width: 8px;
      background-color: #363636;
      border-radius: 8px;
      &:active {
        background-color: #464646;
      }
    }
    .loading-box {
      margin: 2rem 0px;
    }
  }
`;
exports.default = NotificationsPanel;
