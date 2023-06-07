"use strict";
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
const API_URL = "/api";
const req = (path, method, body) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    if (!method)
        method = "GET";
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    try {
        const res = yield fetch(API_URL + path, {
            headers,
            method,
            body: method == "GET" ? null : JSON.stringify(body),
        });
        const json = yield res.json();
        const { status } = res;
        if (status >= 200 && status < 300)
            resolve(json);
        else if (status == 401)
            unAuthorized();
        else
            reject(json === null || json === void 0 ? void 0 : json.message);
    }
    catch (error) {
        reject(error.toString());
    }
}));
const unAuthorized = () => {
    document.cookie = "isloggedin=;Max-Age=0";
    document.cookie = "token=;Max-age=0";
    document.cookie = "refreshid=;Max-Age=0";
    document.location.reload();
};
exports.default = req;
