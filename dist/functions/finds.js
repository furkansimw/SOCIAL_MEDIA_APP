"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (ui) => { var _a; return ((_a = sessions.find((s) => s.userid == ui)) === null || _a === void 0 ? void 0 : _a.socketid) || ""; };
