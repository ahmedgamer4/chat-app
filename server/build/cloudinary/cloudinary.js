"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const cloudinary_1 = require("cloudinary");
const cloudinary_config_1 = require("../config/cloudinary.config");
exports.CloudinaryProvider = {
    provide: 'Cloudinary',
    useFactory: () => {
        return cloudinary_1.v2.config(cloudinary_config_1.default);
    },
};
//# sourceMappingURL=cloudinary.js.map