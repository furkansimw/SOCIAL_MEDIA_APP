"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const socket_1 = __importDefault(require("./api/socket/socket"));
const Test = () => {
    (0, react_1.useEffect)(() => {
        socket_1.default.on("notifications", (data) => alert("xd"));
    }, []);
    const tap = () => socket_1.default.emit("notifications", "xd");
    return (<div>
      <h1>Test</h1>
      <button onClick={tap}>Button</button>
    </div>);
};
exports.default = Test;
