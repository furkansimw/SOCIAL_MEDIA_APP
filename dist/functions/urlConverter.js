"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("../db/cloudinary");
exports.default = (id, img) => (0, cloudinary_1.upload)(img, `${id}-pp`, "pp");
