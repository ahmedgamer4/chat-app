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
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcrypt");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let UsersService = class UsersService {
    constructor(usersRepo, cloudinaryService) {
        this.usersRepo = usersRepo;
        this.cloudinaryService = cloudinaryService;
    }
    getUsers() {
        return this.usersRepo.find();
    }
    async getUserById(id) {
        const user = await this.usersRepo
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.messages', 'message')
            .where('user.id = :id', { id })
            .getOne();
        if (!user) {
            throw new common_1.NotFoundException('User Not Found');
        }
        return user;
    }
    findOne(fields) {
        return this.usersRepo.findOne({
            where: fields,
        });
    }
    async createUser(createUserDto) {
        const user = await this.findOne({ email: createUserDto.email });
        if (user) {
            throw new common_1.BadRequestException('Email is Already User');
        }
        const passwordHash = await bcrypt.hash(createUserDto.password, 10);
        const { name, email, githubId, googleId, facebookId } = createUserDto;
        const userToCreate = {
            name,
            email,
            githubId,
            googleId,
            facebookId,
            passwordHash,
            messages: [],
            groups: [],
        };
        const newUser = this.usersRepo.create(userToCreate);
        return this.usersRepo.save(newUser);
    }
    async updateProfileImage(filename, id) {
        try {
            const uploadedImage = await this.cloudinaryService.uploadImage(filename);
            const userToUpdate = await this.usersRepo.findOne({ where: { id } });
            const userToUpload = Object.assign(Object.assign({}, userToUpdate), { photo: uploadedImage.url });
            const userToSave = this.usersRepo.create(userToUpload);
            return this.usersRepo.save(userToSave);
        }
        catch (error) {
            throw new common_1.BadRequestException({
                error,
            });
        }
    }
    async updateUser(id, updateUserDto) {
        const user = await this.usersRepo
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.messages', 'message')
            .where('user.id = :id', { id })
            .getOne();
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${id} is not found`);
        }
        if (updateUserDto.message) {
            await this.usersRepo
                .createQueryBuilder('user')
                .relation(user_entity_1.User, 'messages')
                .of(user)
                .addAndRemove([updateUserDto.message, ...user.messages], user.messages);
            user.messages = await this.usersRepo
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.messages', 'message')
                .where('user.id = :id', { id: user.id })
                .getOne()
                .then((user) => user.messages);
        }
        const passwordHash = updateUserDto.password
            ? await bcrypt.hash(updateUserDto.password, 10)
            : user.passwordHash;
        const { name, bio, photo, phone, password } = updateUserDto;
        const updatedUser = Object.assign(Object.assign({}, user), { name,
            passwordHash,
            bio,
            photo,
            phone,
            password });
        const userToUpload = this.usersRepo.create(updatedUser);
        return this.usersRepo.save(userToUpload);
    }
    async deleteUser(id) {
        const user = await this.getUserById(id);
        await this.usersRepo.remove(user);
        return user;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        cloudinary_service_1.CloudinaryService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map