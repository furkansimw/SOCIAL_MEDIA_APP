"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.upload = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const cd = cloudinary_1.default.v2;
const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;
cloudinary_1.default.v2.config({ cloud_name, api_key, api_secret });
const upload = (image, public_id, folder) => cd.uploader.upload(image, { folder, public_id }).then((r) => r.url);
exports.upload = upload;
const destroy = (public_id, folder) => cd.uploader.destroy(folder + public_id);
exports.destroy = destroy;
