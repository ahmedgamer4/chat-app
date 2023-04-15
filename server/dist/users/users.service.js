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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user.entity");
let UsersService = class UsersService {
    constructor(userRepo) {
        this.userRepo = userRepo;
        this.users = [
            {
                id: 1,
                name: 'John Smith',
                phone: '+15145551234',
                profession: 'Software Engineer',
            },
            {
                id: 2,
                name: 'Jane Doe',
                phone: '+15145552345',
                profession: 'Marketing Manager',
            },
            {
                id: 3,
                name: 'Bob Johnson',
                phone: '+15145553456',
                profession: 'Graphic Designer',
            },
            {
                id: 4,
                name: 'Emily Davis',
                phone: '+15145554567',
                profession: 'Data Analyst',
            },
            {
                id: 5,
                name: 'Alex Brown',
                phone: '+15145555678',
                profession: 'Product Manager',
            },
        ];
    }
    getUsers(profession) {
        if (profession) {
            return this.users.filter((u) => u.profession === profession);
        }
        return this.users;
    }
    getUser(id) {
        const user = this.users.find((u) => u.id === id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    createUser(createUserDto) {
        const userToAdd = Object.assign(Object.assign({}, createUserDto), { id: Math.round(Math.random() * 10000) });
        this.users.push(userToAdd);
        console.log(userToAdd);
        return JSON.parse(JSON.stringify(userToAdd));
    }
    updateUser(id, updateUserDto) {
        this.users = this.users.map((user) => {
            if (user.id === id) {
                return Object.assign(Object.assign({}, user), updateUserDto);
            }
            return user;
        });
        return this.getUser(id);
    }
    deleteUser(id) {
        const toBeDeleted = this.users.find((user) => user.id === id);
        this.users = this.users.filter((user) => user.id !== id);
        return toBeDeleted;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map