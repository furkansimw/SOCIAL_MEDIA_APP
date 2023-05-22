"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpVal = exports.loginVal = void 0;
const loginVal = (username, password) => username &&
    password &&
    new RegExp("^(?=.{6,36}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$").test(username) &&
    password.length >= 6 &&
    password.length <= 100;
exports.loginVal = loginVal;
const signUpVal = (username, password, email, fullname) => loginVal(username, password) &&
    email &&
    new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$").test(email) &&
    fullname
    ? fullname.length <= 50
    : true;
exports.signUpVal = signUpVal;
