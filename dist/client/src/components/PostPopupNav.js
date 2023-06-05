"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const styled_components_1 = __importDefault(require("styled-components"));
const Icons_1 = require("./Icons");
const react_redux_1 = require("react-redux");
const postsReducer_1 = require("../redux/postsReducer");
const react_redux_2 = require("react-redux");
const profile_1 = require("../api/profile");
const posts_1 = require("../api/posts");
const PostPopupNav = () => {
    const posts = (0, react_redux_1.useSelector)(postsReducer_1.selectpostsForBack, react_redux_1.shallowEqual);
    const [index, setIndex] = (0, react_1.useState)(posts.findIndex((p) => p.id == window.location.pathname.split("/")[2]));
    const dispatch = (0, react_redux_2.useDispatch)();
    const nextF = () => {
        if (index == posts.length - 1)
            return;
        setIndex(index + 1);
        window.history.replaceState(null, "", `/p/${posts[index + 1].id}`);
        dispatch((0, postsReducer_1.setCurrentPostId)(window.location.pathname.split("/")[2]));
    };
    const back = (0, react_redux_1.useSelector)(postsReducer_1.selectBack, react_redux_1.shallowEqual);
    const username = back ? back : window.location.pathname.split("/")[1];
    const a = (0, react_redux_1.useSelector)((s) => ["explore", "home"].includes(back)
        ? (0, postsReducer_1.selectMetaData)(s)
        : (0, postsReducer_1.selectProfile)(s, username), react_redux_1.shallowEqual);
    (0, react_1.useEffect)(() => {
        if (back == "explore") {
            const { hasmore: { [back]: hasmore }, loading: { [back]: loading }, } = a;
            if (index == posts.length - 1 && hasmore && !loading) {
                const { created: date, id } = posts[posts.length - 1];
                dispatch((0, posts_1.getPosts)({ explore: true, date, id }));
            }
        }
        else {
            const { hasmore, loading } = a;
            if (index == posts.length - 1 && hasmore && !loading) {
                const username = window.location.pathname.split("/")[2];
                const { created: date, id } = posts[posts.length - 1];
                dispatch((0, profile_1.getProfilePosts)({ username, date, id }));
            }
        }
    }, [index]);
    (0, react_1.useEffect)(() => {
        const worker = (e) => {
            if (e.key == "ArrowLeft")
                backF();
            else if (e.key == "ArrowRight")
                nextF();
        };
        window.addEventListener("keydown", worker);
        return () => {
            window.removeEventListener("keydown", worker);
        };
    }, [index]);
    const backF = () => {
        if (index == 0)
            return;
        setIndex(index - 1);
        window.history.replaceState(null, "", `/p/${posts[index - 1].id}`);
        dispatch((0, postsReducer_1.setCurrentPostId)(window.location.pathname.split("/")[2]));
    };
    return (<Container>
      {index > 0 && (<button className="leftnav" onClick={backF}>
          <Icons_1.ArrowLeft />
        </button>)}
      {index < posts.length - 1 && (<button className="rightnav" onClick={nextF}>
          <Icons_1.ArrowRight />
        </button>)}
    </Container>);
};
const Container = styled_components_1.default.div `
  position: fixed;
  top: calc(50% - 1rem);
  z-index: 121;
  width: 100%;
  height: 2rem;
  padding: 0px 1rem;
  pointer-events: none;
  button {
    pointer-events: all;
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    &:hover {
      opacity: 0.8;
    }
    background-color: #fff;
    &.leftnav {
      left: 1rem;
    }
    &.rightnav {
      right: 1rem;
    }
  }
  svg {
    transform: rotate(90deg);
    width: 1rem;
    height: 1rem;
  }
  .leftnav {
    transform: rotate(-180deg);
  }
`;
exports.default = (0, react_1.memo)(PostPopupNav);
