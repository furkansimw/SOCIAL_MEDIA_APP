"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conv = (obj) => {
    var { date, id } = obj;
    if (date == "undefined" ||
        date == undefined ||
        id == "undefined" ||
        id == undefined)
        return;
    const d = new Date(date);
    const a = { date: d, id };
    return a;
};
exports.default = conv;
