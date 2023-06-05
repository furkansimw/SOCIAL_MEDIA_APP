"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_helmet_1 = __importDefault(require("react-helmet"));
const Title = ({ title }) => {
    title = "| " + title;
    return (<react_helmet_1.default>
      <title>Social Media App {title}</title>
    </react_helmet_1.default>);
};
exports.default = Title;
