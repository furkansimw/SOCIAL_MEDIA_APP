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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const mwQueries_1 = require("../queries/mwQueries");
const tokenMwFunctions_1 = require("../functions/tokenMwFunctions");
const authControllersFunctions_1 = require("../functions/authControllersFunctions");
const tokenMw = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, refreshid } = req.cookies;
    if (token) {
        try {
            const { id } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "");
            res.locals.id = id;
            next();
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.JsonWebTokenError &&
                error.message == "TokenExpiredError") {
                const { id } = jsonwebtoken_1.default.decode(token);
                const ok = yield (0, mwQueries_1.checkSessions)(id, refreshid);
                if (ok) {
                    res.locals.id = id;
                    (0, authControllersFunctions_1.cookieSetter)(res, id, refreshid);
                    next();
                }
                else {
                    (0, tokenMwFunctions_1.clearCookies)(res);
                }
            }
            else {
            }
        }
    }
    else {
        res.locals.guest = true;
        next();
    }
});
exports.default = tokenMw;
