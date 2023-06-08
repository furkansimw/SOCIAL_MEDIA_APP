"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const profile_1 = require("../../api/profile");
const profileReducer_1 = require("../../redux/profileReducer");
const react_redux_1 = require("react-redux");
const react_redux_2 = require("react-redux");
const Icons_1 = require("../Icons");
const UnfollowPopup_1 = __importDefault(require("../../pages/UnfollowPopup"));
const LoadingBox_1 = __importDefault(require("../LoadingBox"));
const LinkQ_1 = __importDefault(require("../post/LinkQ"));
const Navigation_1 = require("../navigation/Navigation");
const styled_components_1 = __importDefault(require("styled-components"));
const Views = ({ quit, type, userid }) => {
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [hasmore, setHasmore] = (0, react_1.useState)(true);
    const [relationships, setRelationships] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const worker = (e) => {
            if (e.key == "Escape")
                quit();
        };
        window.addEventListener("keydown", worker);
        return () => {
            window.removeEventListener("keydown", worker);
        };
    }, []);
    (0, react_1.useEffect)(() => {
        (0, profile_1.getRelationships)(userid, type)
            .then((r) => {
            setRelationships(r);
            setHasmore(r.length == 12);
        })
            .catch(() => setHasmore(false))
            .finally(() => setLoading(false));
    }, []);
    const onScroll = (e) => {
        const { created: date, rid: id } = relationships[relationships.length - 1];
        if (loading || !hasmore)
            return;
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        if (scrollTop + clientHeight + 40 > scrollHeight) {
            setLoading(true);
            (0, profile_1.getRelationships)(userid, type, { date, id })
                .then((r) => {
                setRelationships([...relationships, ...r]);
                setHasmore(r.length == 12);
            })
                .catch(() => setHasmore(false))
                .finally(() => setLoading(false));
        }
    };
    const con = (s) => {
        if (s == null)
            return `Follow`;
        if (s == 0)
            return `Following`;
        if (s == 1)
            return `Requested`;
        return ``;
    };
    const { username: myusername } = (0, react_redux_2.useSelector)(profileReducer_1.selectValues, react_redux_1.shallowEqual);
    const [p, _p] = (0, react_1.useState)({
        active: false,
        process: () => { },
        data: { pp: null, username: "" },
    });
    const tap = (p) => {
        const { status, ispublic, username, id, pp } = p;
        if (status == null) {
            // follow
            (0, profile_1.followUserS)(id, true);
            const newLikes = relationships.map((l) => {
                if (l.username == username)
                    return Object.assign(Object.assign({}, l), { status: ispublic ? 0 : 1 });
                return l;
            });
            setRelationships(newLikes);
        }
        else {
            (0, profile_1.followUserS)(id, false);
            const process = () => {
                const newLikes = relationships.map((l) => {
                    if (l.username == username)
                        return Object.assign(Object.assign({}, l), { status: ispublic ? 0 : 1 });
                    return l;
                });
                setRelationships(newLikes);
            };
            if (ispublic)
                process();
            else
                _p({ active: true, data: { username, pp }, process });
        }
    };
    return (<>
      <Bg onClick={quit}/>
      <Container>
        <div className="headerxxx">
          <p>{type}</p>
          <button onClick={quit}>
            <Icons_1.CloseIcon />
          </button>
        </div>
        {p.active && (<UnfollowPopup_1.default data={p.data} close={() => _p(Object.assign(Object.assign({}, p), { active: false }))} process={p.process}/>)}
        <ul onScroll={onScroll} className="contentx">
          {relationships.map((obj) => (<li key={obj.rid}>
              <LinkQ_1.default onClick={quit} className="pp" to={`/${obj.username}`}>
                <img onContextMenu={Navigation_1.disableRightClick} src={obj.pp || "/pp.jpg"} alt="pp"/>
              </LinkQ_1.default>
              <div className="text">
                <LinkQ_1.default onClick={quit} to={`/${obj.username}`}>
                  <p className="username">{obj.username}</p>
                </LinkQ_1.default>
                {obj.fullname && <p className="fullname">{obj.fullname}</p>}
              </div>
              {obj.username != myusername && (<button className={con(obj.status)} onClick={() => tap(obj)}>
                  {con(obj.status)}
                </button>)}
            </li>))}
          {loading && <LoadingBox_1.default />}
        </ul>
      </Container>
    </>);
};
const Bg = styled_components_1.default.div `
  background-color: rgba(0, 0, 0, 0.5);
  width: 200vw;
  height: 200vh;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1300;
  transform: translate(-10%, -10%);
`;
const Container = styled_components_1.default.div `
  transform: scale(1.2);
  @keyframes scx {
    from {
      transform: scale(1.2);
    }
    to {
      transform: scale(1);
    }
  }
  animation: scx 0.1s ease-in-out forwards;
  width: 400px;
  background-color: #262626;
  border-radius: 8px;
  height: 400px;
  position: fixed;
  z-index: 1400;
  left: calc(50% - 200px);
  top: calc(50% - 200px);
  border-radius: 1rem;
  .headerxxx {
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-weight: 600;
    border-bottom: 1px solid #363636;
    button {
      width: 2rem;
      height: 2rem;
      position: absolute !important;
      right: 10px;
    }
  }
  .contentx {
    height: calc(100% - 42px);
    overflow-y: auto;
    display: block;
    padding: 0px;
    .loading-box {
      margin: 2rem 0px;
      position: relative;
      height: 2rem;
      background-color: transparent;
    }
    li {
      display: flex;
      height: 60px;
      padding: 0.5rem 1rem;
      align-items: center;
      .pp {
        width: 44px;
        height: 44px;
        margin-right: 12px;
        display: block;
        img {
          width: 44px;
          height: 44px;
          border-radius: 100%;
        }
      }
      .text {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 36px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        p {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 18px;
          font-size: 14px;
          margin: 0px;
          &.username {
            font-weight: 600;
          }
          &.fullname {
            color: #a8a8a8;
            font-weight: 400;
          }
        }
      }
      button {
        margin-left: 12px;
        padding: 7px 1rem;
        border-radius: 8px;
        background-color: #fafafa;
        color: #000;
        font-size: 14px;
        font-weight: 600;
        &:hover {
          opacity: 0.8;
        }
        &.Follow {
          background-color: #0095f6;
          color: #fafafa;
        }
      }
    }
  }
  @media screen and (max-width: 464px) {
    left: 2rem;
    width: calc(100% - 4rem);
  }
  @media screen and (max-height: 464px) {
    top: 2rem;
    max-height: calc(100% - 4rem);
  }
`;
exports.default = Views;
