"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const swagger_1 = require("@nestjs/swagger");
const group_entity_1 = require("../groups/group.entity");
const user_entity_1 = require("../users/user.entity");
const typeorm_1 = require("typeorm");
let Message = class Message {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Message.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'text',
    }),
    __metadata("design:type", String)
], Message.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'text',
    }),
    __metadata("design:type", String)
], Message.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Message.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], Message.prototype, "user_photo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({
        type: 'date',
    }),
    __metadata("design:type", Date)
], Message.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.messages, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.User)
], Message.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.ManyToOne)(() => group_entity_1.Group, (group) => group.messages, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", group_entity_1.Group)
], Message.prototype, "group", void 0);
Message = __decorate([
    (0, typeorm_1.Entity)('messages')
], Message);
exports.Message = Message;
//# sourceMappingURL=message.entity.js.map