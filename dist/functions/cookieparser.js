"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (cookies) => {
    let obj = {};
    cookies === null || cookies === void 0 ? void 0 : cookies.split(";").filter((_) => _.trim()).map((cookiepart) => {
        const cookiesplittedlist = cookiepart.split("=");
        const cookiekey = cookiesplittedlist[0].trim();
        const cookievalue = cookiesplittedlist[1];
        obj[cookiekey] = cookievalue;
    });
    return obj;
};
