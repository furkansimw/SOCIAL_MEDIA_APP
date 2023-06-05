"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const postsReducer_1 = require("../redux/postsReducer");
const posts_1 = require("../api/posts");
const LoadingBox_1 = __importDefault(require("../components/LoadingBox"));
const PostMini_1 = __importDefault(require("../components/post/PostMini"));
const styled_components_1 = __importDefault(require("styled-components"));
const Title_1 = __importDefault(require("../components/Title"));
const Explore = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const posts = (0, react_redux_1.useSelector)(postsReducer_1.selectPostsExplore, react_redux_1.shallowEqual);
    const { hasmore: { explore: hasmore }, loading: { explore: loading }, offset: { explore: offset }, } = (0, react_redux_1.useSelector)(postsReducer_1.selectMetaData, react_redux_1.shallowEqual);
    (0, react_1.useEffect)(() => {
        if (posts.length == 0)
            dispatch((0, posts_1.getPosts)({ explore: true }));
    }, []);
    const onScroll = (e) => {
        if (loading || !hasmore)
            return;
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollTop + clientHeight + 100 >= scrollHeight) {
            const { created: date, id } = posts[posts.length - 1];
            dispatch((0, posts_1.getPosts)({ explore: true, date, id }));
        }
    };
    const listRef = (0, react_1.useRef)(null);
    (0, react_1.useLayoutEffect)(() => {
        listRef.current.scroll({ top: offset });
        return () => {
            const offset = listRef.current.scrollTop;
            dispatch((0, postsReducer_1.setOffset)({ page: "explore", offset }));
        };
    }, []);
    return (<Container ref={listRef} onScroll={onScroll}>
      <Title_1.default title="Explore"/>
      <div className="content">
        {posts.map((post) => (<PostMini_1.default key={post.id} post={post} back="explore"/>))}
      </div>
      {loading && <LoadingBox_1.default />}
    </Container>);
};
const Container = styled_components_1.default.ul `
  width: 100%;
  max-height: 100vh;
  overflow-y: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    max-width: calc(906px + 2rem);
    width: 100%;
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 3px;
  }
  .loading-box {
    margin: 2rem 0px;
  }
`;
exports.default = Explore;
