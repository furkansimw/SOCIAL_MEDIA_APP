"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const Icons_1 = require("../Icons");
const profile_1 = require("../../api/profile");
const react_router_dom_1 = require("react-router-dom");
const LoadingBox_1 = __importDefault(require("../LoadingBox"));
const FollowRequests = ({ isActive, close }) => {
    (0, react_1.useEffect)(() => {
        if (!isActive)
            return;
        _d([]);
        setLoading(true);
        setHasmore(true);
        (0, profile_1.followRequests)({ l: false })
            .then((r) => {
            setHasmore(r.length == 12);
            _d(r);
        })
            .finally(() => setLoading(false));
    }, [isActive]);
    const [hasmore, setHasmore] = (0, react_1.useState)(true);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [d, _d] = (0, react_1.useState)([]);
    const onScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (!hasmore || loading)
            return;
        if (scrollTop + 100 + clientHeight >= scrollHeight) {
            const date = d[d.length - 1].created, id = d[d.length - 1].id;
            (0, profile_1.followRequests)({ l: false, date, id })
                .then((r) => {
                setHasmore(r.length == 12);
                _d([...d, ...r]);
            })
                .finally(() => setLoading(false));
        }
    };
    const confirmF = (e, ri) => {
        e.preventDefault();
        (0, profile_1.requestAction)(ri, true).then(() => {
            const newD = d.map((a) => {
                if ((a.id = ri))
                    return Object.assign(Object.assign({}, a), { isallowed: true });
                return a;
            });
            _d(newD);
        });
    };
    const denyF = (e, ri) => {
        e.preventDefault();
        (0, profile_1.requestAction)(ri, true);
        const newD = d.filter((a) => a.id != ri);
        _d(newD);
    };
    return (<Container className={isActive ? "a" : ""}>
      <div className="up">
        <button onClick={close}>
          <Icons_1.BigLeftArrow />
        </button>
        <p>Follow requests</p>
      </div>
      <ul onScroll={onScroll}>
        {d.map((requestitem) => (<li key={requestitem.id} onClick={close}>
            <react_router_dom_1.Link to={`/${requestitem.username}`}>
              <img className="pp" src={requestitem.pp || "/pp.jpg"} alt="pp"/>
              <div className="text">
                <p className="u">{requestitem.username}</p>
                {requestitem.fullname && (<p className="fn">{requestitem.fullname}</p>)}
              </div>
              {requestitem.isallowed ? (<>
                  <button className={requestitem.status == null ? "f" : ""}>
                    {requestitem.status == null
                    ? "Follow"
                    : requestitem.status == 0
                        ? "Following"
                        : "Requested"}
                  </button>
                </>) : (<>
                  <button className={"confirm"} onClick={(e) => confirmF(e, requestitem.id)}>
                    Confirm
                  </button>
                  <button className={"delete"} onClick={(e) => denyF(e, requestitem.id)}>
                    Delete
                  </button>
                </>)}
            </react_router_dom_1.Link>
          </li>))}
        {loading && <LoadingBox_1.default />}
      </ul>
    </Container>);
};
const Container = styled_components_1.default.ul `
  width: 0px;
  overflow: hidden;
  transition: 0.3s ease-in-out all;
  height: 100%;
  overflow-y: auto;
  &.a {
    width: 100%;
  }
  padding: 1rem 0px;
  .up {
    height: 48px;
    position: relative;
    padding: 8px 1rem;
    margin-top: 4px;
    button {
      position: absolute;
      left: 28px;
      top: 8px;
      svg {
        transform: rotate(-90deg);
      }
    }
    p {
      font-weight: 700;
      width: 100%;
      text-align: center;
    }
  }
  ul {
    width: 100%;
    height: calc(100% - 58px);
    overflow-y: auto;
    overflow-x: hidden;
    &:hover {
      &::-webkit-scrollbar-thumb {
        background-color: #363636;
      }
      &::-webkit-scrollbar {
        background-color: #202020;
      }
    }
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      width: 8px;
      border-radius: 8px;
      background-color: transparent;
      &:active {
        background-color: #484848;
      }
    }
    li {
      white-space: nowrap;
      width: 366px;
      a {
        display: flex;
        padding: 10px 24px;
        align-items: center;
        width: 100%;
        &:hover {
          background-color: #161616;
        }
        .pp {
          width: 2rem;
          height: 2rem;
          border-radius: 100%;
          margin-right: 12px;
        }
        .text {
          width: 100%;
          white-space: pre-wrap;
          font-size: 14px;
          max-lines: 2;
          height: 36px;
          line-height: 18px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: flex;
          justify-content: center;
          flex-direction: column;
          p {
            font-weight: 600;
            padding: 0px;
            display: inline-block;
            margin-right: 4px;
            width: min-content;
            &.fn {
              color: #a8a8a8;
            }
          }
        }
        button {
          font-size: 14px;
          border-radius: 8px;
          padding: 7px 1rem;
          background-color: #fafafa;
          color: #000;
          margin-left: 8px;
          font-weight: 600;
          &.confirm {
            background-color: #0095f6;
            color: #fafafa;
          }
          &.f {
            background-color: #0095f6;
            color: #fafafa;
          }
        }
      }
    }
    .loading-box {
      margin: 1rem 0px;
    }
  }
`;
exports.default = FollowRequests;
