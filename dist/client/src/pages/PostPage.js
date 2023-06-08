"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { shallowEqual, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import { selectCurrentPost } from "../redux/postsReducer";
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const posts_1 = require("../api/posts");
const PostPage = () => {
    const postid = window.location.pathname.split("/")[2];
    const dispatch = (0, react_redux_1.useDispatch)();
    // const currentPost = useSelector(selectCurrentPost, shallowEqual);
    (0, react_1.useEffect)(() => {
        dispatch((0, posts_1.getPost)(postid));
    }, [postid]);
    return (<div>
      <h1>Furkan</h1>
    </div>);
};
exports.default = PostPage;
