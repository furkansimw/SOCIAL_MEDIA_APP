"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const profileReducer_1 = require("../../redux/profileReducer");
const react_redux_2 = require("react-redux");
const Priv = ({ info }) => {
    const { username: myusername } = (0, react_redux_1.useSelector)(profileReducer_1.selectValues, react_redux_1.shallowEqual);
    const { username, ispublic, status } = info;
    const isloggedin = (0, react_redux_1.useSelector)(profileReducer_1.selectIsLoggedin, react_redux_1.shallowEqual);
    const dispatch = (0, react_redux_2.useDispatch)();
    const loginHandle = () => dispatch((0, profileReducer_1.toggleSetLoginPopupActive)());
    if (username == myusername)
        return null;
    if (status != 0 && !ispublic)
        return (<div className="priv">
        {isloggedin ? (<>
            <p>This Account is Private</p>
            <p> Follow to see their photos.</p>
          </>) : (<>
            <p>
              This Account is Private Already follow
              <span className="us">{username}</span>
            </p>
            <p>
              <span onClick={loginHandle}>Log in</span> to see their photos.
            </p>
          </>)}
      </div>);
    return null;
};
exports.default = Priv;
