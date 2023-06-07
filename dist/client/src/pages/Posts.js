"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const posts_ts_1 = require("../api/posts.ts");
const postsReducer_ts_1 = require("../redux/postsReducer.ts");
const PostItemHome_tsx_1 = __importDefault(require("../components/post/PostItemHome.tsx"));
const LoadingBox_tsx_1 = __importDefault(require("../components/LoadingBox.tsx"));
const styled_components_1 = __importDefault(require("styled-components"));
const react_redux_2 = require("react-redux");
const Title_tsx_1 = __importDefault(require("../components/Title.tsx"));
const Posts = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const posts = (0, react_redux_1.useSelector)(postsReducer_ts_1.selectPostsHome);
    const { hasmore: { home: hasmore }, loading: { home: loading }, offset: { home: offset }, } = (0, react_redux_1.useSelector)(postsReducer_ts_1.selectMetaData, react_redux_2.shallowEqual);
    (0, react_1.useEffect)(() => {
        if (posts.length == 0)
            dispatch((0, posts_ts_1.getPosts)({}));
    }, []);
    const onScroll = (e) => {
        if (loading || !hasmore)
            return;
        const { created: date, id } = posts[posts.length - 1];
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollTop + clientHeight + 100 >= scrollHeight) {
            dispatch((0, posts_ts_1.getPosts)({ date, id }));
        }
    };
    const listRef = (0, react_1.useRef)(null);
    (0, react_1.useLayoutEffect)(() => {
        listRef.current.scroll({ top: offset });
        return () => {
            const offset = listRef.current.scrollTop;
            dispatch((0, postsReducer_ts_1.setOffset)({ page: "home", offset }));
        };
    }, []);
    return (<Container ref={listRef} onScroll={onScroll}>
      <Title_tsx_1.default title="Posts"/>
      {posts.map((post) => (<PostItemHome_tsx_1.default post={post}/>))}
      {loading && <LoadingBox_tsx_1.default />}
    </Container>);
};
const Container = styled_components_1.default.ul `
  height: 100vh;
  overflow-x: hidden;
  width: 100%;
  overflow-y: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  @media screen and (max-width: 600px) {
    li {
      min-height: 400px;
    }
  }
  li {
    max-width: 500px;
    width: 100%;
    min-width: 0px;
    min-height: 700px;
    &:first-child {
      border-top: none;
    }
  }
  .loading-box {
    margin: 2rem;
  }
`;
exports.default = Posts;
