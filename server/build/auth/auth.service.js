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
exports.AuthService = void 0;
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const userToCreate = Object.assign(Object.assign({}, dto), { passwordHash, messages: [], groups: [] });
        await this.userService.createUser(userToCreate);
    }
    async validateLogin(loginDto) {
        const user = await this.userService.findOne({
            email: loginDto.email,
        });
        if (!user) {
            throw new common_1.NotFoundException('User Not Found');
        }
        const isValidPassword = await bcrypt.compare(loginDto.password, user.passwordHash);
        if (isValidPassword) {
            const token = this.jwtService.sign({
                sub: user.id,
                username: user.name,
                photo: user.photo,
            });
            return { token, user };
        }
        else {
            throw new common_1.BadRequestException('Password is Incorrect');
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map