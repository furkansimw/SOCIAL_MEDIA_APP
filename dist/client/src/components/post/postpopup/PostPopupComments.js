"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const styled_components_1 = __importDefault(require("styled-components"));
const react_redux_1 = require("react-redux");
const posts_1 = require("../../../api/posts");
const Info_1 = __importDefault(require("./Info"));
const Data_1 = __importDefault(require("./Data"));
const Bottom_1 = __importDefault(require("./Bottom"));
const react_redux_2 = require("react-redux");
const postsReducer_1 = require("../../../redux/postsReducer");
const functions_1 = require("./functions");
const PostPopupComments = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const postid = window.location.pathname.split("/")[2];
    const cp = (0, react_redux_2.useSelector)(postsReducer_1.selectCurrentPost, react_redux_1.shallowEqual);
    const { comments: { hasmore, data, sending }, } = cp;
    (0, react_1.useEffect)(() => {
        if (hasmore && data.length == 0)
            dispatch((0, posts_1.getComments)({ postid }));
    }, [postid]);
    const [comment, setComment] = (0, react_1.useState)("");
    const commentInputRef = (0, react_1.useRef)(null);
    const [isRepliying, setIsRepliying] = (0, react_1.useState)(null);
    const [i, _i] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        _i(true);
    }, []);
    const reply = (commentid, username) => {
        var _a, _b;
        setComment(`@${username} `);
        setIsRepliying({
            commentid,
            username,
            offset: ((_a = dataContainerRef.current) === null || _a === void 0 ? void 0 : _a.scrollTop) || 0,
        });
        (_b = commentInputRef.current) === null || _b === void 0 ? void 0 : _b.focus();
    };
    (0, react_1.useEffect)(() => {
        if (!i)
            return;
        if (!sending) {
            if (isRepliying)
                scrollTop(totalHeight);
            else
                scrollTop(dataRef.current.contentRef.current.clientHeight || 0);
            setComment("");
        }
    }, [sending]);
    (0, react_1.useEffect)(() => {
        if (isRepliying) {
            const { username } = isRepliying;
            if (comment.slice(0, username.length + 2) != `@${username} `) {
                setIsRepliying(null);
                setComment("");
            }
        }
    }, [comment]);
    const [totalHeight, setTotalHeight] = (0, react_1.useState)(0);
    const scrollTop = (top) => (0, functions_1.startSmoothScroll)(dataRef.current.dataContainerRef.current, top, 500);
    const dataContainerRef = (0, react_1.useRef)(null);
    const contentRef = (0, react_1.useRef)(null);
    const dataRef = (0, react_1.useRef)({
        dataContainerRef,
        contentRef,
    });
    (0, react_1.useEffect)(() => {
        var _a;
        if (!isRepliying)
            return;
        if (dataRef.current.dataContainerRef.current) {
            var cE = Array.from(dataRef.current.dataContainerRef.current.children);
            cE = cE.slice(1);
            const cCI = data.findIndex((obj) => obj.id == isRepliying.commentid);
            let heightSum = 0;
            for (let i = 0; i <= cCI; i++)
                heightSum += cE[i].clientHeight;
            setTotalHeight(heightSum + ((_a = dataRef.current.contentRef.current) === null || _a === void 0 ? void 0 : _a.clientHeight));
        }
    }, [data, isRepliying]);
    return (<Container className="c">
      <Info_1.default />
      <Data_1.default reply={reply} ref={dataRef}/>
      <Bottom_1.default ref={commentInputRef} {...{ comment, setComment, isRepliying }}/>
    </Container>);
};
const Container = styled_components_1.default.div `
  width: 100%;
  min-width: 400px;
  max-width: 400px;
  height: 100%;
`;
exports.default = (0, react_1.memo)(PostPopupComments);
