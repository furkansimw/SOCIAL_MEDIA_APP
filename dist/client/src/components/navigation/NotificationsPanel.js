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
const profile_2 = require("../../api/profile");
const Icons_1 = require("../Icons");
const NotificationsPanel = (0, react_1.forwardRef)(({ isActive, closepanel }, ref) => {
    const [lastrequest, setLastRequest] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        setFr(false);
        if (isActive) {
            setLoading(true);
            (0, profile_2.followRequests)({ l: true }).then((lr) => (0, profile_1.notificationsGet)({}).then((r) => {
                setLastRequest(lr.length == 1 ? lr[0] : null);
                setNotifications(r);
                setHasmore(r.length == 12);
                setLoading(false);
            }));
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
    const [fr, setFr] = (0, react_1.useState)(false);
    const setNotificationViewOpen = () => setFr(true);
    return (<Container className={isActive ? "active" : ""} ref={ref}>
        <div className={`ctx ${fr ? "fr" : ""}`}>
          <div className="upside">
            <h1>Notifications</h1>
          </div>
          <ul onScroll={onScroll}>
            {lastrequest && (<div className="lastrequest" onClick={setNotificationViewOpen}>
                <img src={(lastrequest === null || lastrequest === void 0 ? void 0 : lastrequest.pp) || "/pp.jpg"} alt="lrpp"/>
                <div className="text">
                  <p className="fr">Follow request</p>
                  <p className="u">{lastrequest === null || lastrequest === void 0 ? void 0 : lastrequest.username}</p>
                </div>
                <span>
                  <div className="dot"></div>
                  <Icons_1.SmallRightIconFRFor />
                </span>
              </div>)}
            {notifications.map((n) => {
            return (<NotificationItem_1.default key={n.id} n={n} closepanel={closepanel}/>);
        })}
            {loading && <LoadingBox_1.default />}
          </ul>
        </div>
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
  .ctx {
    height: 100%;
    overflow: hidden;
    width: 100%;
    transition: 0.3s ease-in-out all;
    &.fr {
      width: 0px;
    }
    .upside {
      padding: 24px;
      h1 {
        font-size: 24px;
        line-height: 28px;
        white-space: nowrap;
      }
    }
    ul {
      height: calc(100% - 80px);
      overflow-y: auto;
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
      .lastrequest {
        padding: 8px 24px;
        width: 100%;
        display: flex;
        align-items: center;
        white-space: nowrap;
        cursor: pointer;
        &:hover {
          background-color: #161616;
        }
        img {
          width: 44px;
          height: 44px;
          border-radius: 100%;
          margin-right: 14px;
        }
        .text {
          width: 100%;
          p {
            font-size: 14px;
            font-weight: 400;
            color: #a8a8a8;
            line-height: 18px;
            &.fr {
              line-height: 12px;
              font-weight: 700;
              color: #fafafa;
            }
          }
        }
        span {
          display: flex;
          align-items: center;
          .dot {
            border-radius: 100%;
            margin: 0px 8px;
            width: 8px;
            height: 8px;
            background-color: #0095f6;
          }
          svg {
            transform: rotate(90deg);
          }
        }
      }
      .loading-box {
        margin: 2rem 0px;
      }
    }
  }
`;
exports.default = NotificationsPanel;
