"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usernamePattern = exports.signUpVal = exports.loginVal = void 0;
const loginVal = (username, password) => username &&
    password &&
    new RegExp(usernamePattern).test(username) &&
    ![
        "explore",
        "accounts",
        "account",
        "myaccount",
        "mysaved",
        "mysaveds",
        "search",
        "myprofile",
    ].includes(username) &&
    password.length >= 6 &&
    password.length <= 100;
exports.loginVal = loginVal;
const signUpVal = (username, password, email, fullname) => loginVal(username, password) &&
    email &&
    !["explore", "messages"].includes(username) &&
    new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$").test(email) &&
    fullname
    ? fullname.length <= 50
    : true;
exports.signUpVal = signUpVal;
const usernamePattern = "^(?=.{6,36}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$";
exports.usernamePattern = usernamePattern;
