"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.typeOrmConfig = {
    entities: [__dirname + '/../**/*.entity{.js,.ts}'],
    autoLoadEntities: true,
    type: 'postgres',
    url: process.env.DATABASE_URI,
};
//# sourceMappingURL=typeorm.config.js.map