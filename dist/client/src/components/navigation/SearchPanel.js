"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const styled_components_1 = __importDefault(require("styled-components"));
const profile_1 = require("../../api/profile");
const Icons_1 = require("../Icons");
const LoadingBox_1 = __importDefault(require("../LoadingBox"));
const react_router_dom_1 = require("react-router-dom");
const SearchPanel = (0, react_1.forwardRef)(({ isActive, close }, ref) => {
    const [state, setState] = (0, react_1.useState)("");
    const [focus, setFocus] = (0, react_1.useState)(false);
    const [searchL, setSearchL] = (0, react_1.useState)([]);
    const [recent, setRecent] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        var _a;
        const a = localStorage.getItem("recent");
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        setState("");
        setLoading(false);
        try {
            if (a) {
                const r = JSON.parse(a);
                setRecent(r);
            }
        }
        catch (error) {
            localStorage.removeItem("recent");
        }
    }, [isActive]);
    const onSubmit = (e) => e.preventDefault();
    (0, react_1.useLayoutEffect)(() => {
        setLoading(state.trim().length != 0);
        setSearchL([]);
        var timer;
        clearTimeout(timer);
        timer = setTimeout(() => {
            if (state.trim().length > 0) {
                (0, profile_1.searchProfile)(state)
                    .then(setSearchL)
                    .finally(() => {
                    setLoading(false);
                });
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [state]);
    (0, react_1.useEffect)(() => {
        if (state.trim().length == 0)
            setState("");
    }, [focus]);
    const inputRef = (0, react_1.useRef)(null);
    const onFocus = () => setFocus(true);
    const onBlur = () => setFocus(false);
    const onClick = (i) => {
        var _a;
        let b = recent;
        if ((_a = b.find((_) => _.username == i.username)) === null || _a === void 0 ? void 0 : _a.username) {
            b = b.filter((_) => _.username != i.username);
        }
        b = [i, ...b];
        b = b.filter((_, index) => index < 20);
        setRecent(b);
        localStorage.setItem("recent", JSON.stringify(b));
        close();
    };
    const clearAll = () => setRecent([]);
    (0, react_1.useEffect)(() => {
        localStorage.setItem("recent", JSON.stringify(recent));
    }, [recent]);
    return (<Container className={isActive ? "active" : ""} ref={ref}>
        <div className="title">
          <h1>Search</h1>
        </div>
        <div className="input">
          <form onSubmit={onSubmit}>
            {!focus && state.trim().length == 0 && <Icons_1.SearchIcon2 />}
            <input ref={inputRef} onChange={(e) => setState(e.target.value)} type="text" value={state} onFocus={onFocus} onBlur={onBlur} placeholder="Search"/>
            {(state.length > 0 || focus) && (<button onClick={() => {
                setFocus(false);
                setState("");
            }}></button>)}
          </form>
        </div>
        {state.trim().length == 0 && (<div className="rp">
            <p className="r">Recent</p>
            {recent.length > 0 && <button onClick={clearAll}>Clear all</button>}
          </div>)}
        <ul className={state.trim().length == 0 ? `f` : ``}>
          {!loading && searchL.length == 0 && state.trim().length != 0 && (<p className="nf">No results found.</p>)}
          {loading && <LoadingBox_1.default />}
          {!loading &&
            (state.trim().length > 0 ? searchL : recent).map((i) => {
                const { username, pp, fullname } = i;
                return (<li>
                  <react_router_dom_1.Link to={`/${username}`} onClick={() => onClick(i)}>
                    <img src={pp || "/pp.jpg"} alt="pp"/>
                    <div className="text">
                      <p className="username">{username}</p>
                      <p className="fullname">{fullname}</p>
                      {state.trim().length == 0 && (<button onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setRecent((prev) => prev.filter((_) => _.username != username));
                        }}>
                          <Icons_1.RemoveIcon2 />
                        </button>)}
                    </div>
                  </react_router_dom_1.Link>
                </li>);
            })}
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
  z-index: 50;
  overflow: hidden;
  &.active {
    left: 0px;
  }
  .title {
    padding: 20px;
    h1 {
      font-size: 24px;
      font-weight: 600;
      line-height: 30px;
    }
  }

  .input {
    border-bottom: 1px solid #262626;
    display: flex;
    padding: 10px 20px;
    padding-bottom: 2rem;
    form {
      position: relative;
      width: 100%;
      display: flex;
      border-radius: 8px;
      background-color: #262626;
      align-items: center;
      svg {
        margin-left: 1rem;
      }
      input {
        width: 100%;
        line-height: 18px;
        padding: 12px 1rem;
        font-size: 1rem;
        height: 40px;
        background-color: transparent;
        border: none;
        outline: none;
        padding-right: 40px;
      }
      button {
        background-repeat: no-repeat;
        background-position: -318px -333px;
        height: 20px;
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 3;
        width: 20px;
        background-image: url("/bg.png");
      }
    }
  }
  .rp {
    display: flex;
    justify-content: space-between;
    padding: 1rem 20px;
    width: 100;
    .r {
      font-weight: 600;
    }
    button {
      color: #0095f6;
      &:hover {
        opacity: 0.7;
      }
    }
  }
  ul {
    height: calc(100% - 150px);
    position: relative;
    &.f {
      height: calc(100% - 210px);
    }
    &::-webkit-scrollbar-thumb {
      width: 8px;
      background-color: #363636;
      border-radius: 8px;
      &:active {
        background-color: #404040;
      }
    }
    &::-webkit-scrollbar {
      width: 8px;
      background-color: #161616;
    }
    width: 100%;
    overflow-y: auto;

    .loading-box {
      top: 0px;
      left: 0px;
      height: 100%;
      position: absolute;
      svg {
        height: 24px;
      }
    }
    .nf {
      color: #a8a8a8;
      font-size: 14px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    li {
      position: relative;
      a {
        &:hover {
          background-color: #121212;
        }
        display: flex;
        height: 60px;
        width: 100%;
        padding: 8px 24px;
      }
      img {
        width: 44px;
        height: 44px;
        object-fit: cover;
        border-radius: 100%;
        margin-right: 12px;
      }
      .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        p {
          font-size: 14px;
          &.username {
            font-weight: 600;
          }
          &.fullname {
            color: #a8a8a8;
          }
        }
      }
      button {
        position: absolute;
        right: 24px;
        top: 22px;
        width: 1rem;
        height: 1rem;
      }
    }
  }
`;
exports.default = SearchPanel;
