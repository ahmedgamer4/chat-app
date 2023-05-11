"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('auth', () => ({
    secret: process.env.JWT_SECRET,
    expiresIn: '1d',
}));
//# sourceMappingURL=auth.config.js.map