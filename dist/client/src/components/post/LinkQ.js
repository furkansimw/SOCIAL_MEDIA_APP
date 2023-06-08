"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const postsReducer_1 = require("../../redux/postsReducer");
const LinkQ = (props) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const closex = () => {
        dispatch((0, postsReducer_1.setBack)(null));
        if (props.onClick)
            props.onClick();
    };
    return (<react_router_dom_1.Link replace to={props.to} className={props.className} onClick={closex}>
      {props.children}
    </react_router_dom_1.Link>);
};
exports.default = LinkQ;
