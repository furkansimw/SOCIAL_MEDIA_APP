"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const dompurify_1 = __importDefault(require("dompurify"));
const LinkQ_1 = __importDefault(require("./LinkQ"));
const LinkConverter = ({ text }) => {
    const manipulate = () => {
        const ctext = dompurify_1.default.sanitize(text);
        const words = ctext.split(/(\s+)/);
        return words.map((word, index) => {
            if (word.startsWith("@") && word.endsWith("")) {
                const username = word.slice(1);
                const to = `/${username}`;
                return (<react_1.default.Fragment key={index}>
            <LinkQ_1.default className="b" to={to}>
              {word}
            </LinkQ_1.default>
          </react_1.default.Fragment>);
            }
            else
                return <react_1.default.Fragment key={index}>{word} </react_1.default.Fragment>;
        });
    };
    return <>{manipulate()}</>;
};
exports.default = (0, react_1.memo)(LinkConverter);
