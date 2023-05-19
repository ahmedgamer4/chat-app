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
exports.GroupsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const group_entity_1 = require("./group.entity");
let GroupsService = class GroupsService {
    constructor(groupsRepo) {
        this.groupsRepo = groupsRepo;
    }
    getAllGroups() {
        return this.groupsRepo.find();
    }
    getAllGroupsWithLimit(limit) {
        return this.groupsRepo.createQueryBuilder().limit(limit).getMany();
    }
    createGroup(createGroupDto) {
        const groupToCreate = Object.assign(Object.assign({}, createGroupDto), { messages: [], users: [] });
        const newGroup = this.groupsRepo.create(groupToCreate);
        return this.groupsRepo.save(newGroup);
    }
    async getGroupByName(name) {
        const group = await this.groupsRepo.findOne({ where: { name } });
        if (!group) {
            throw new common_1.HttpException({
                status: 404,
                errors: {
                    group: 'Group Not Found',
                },
            }, 404);
        }
        return group;
    }
    async getGroupById(id) {
        const group = await this.groupsRepo
            .createQueryBuilder('group')
            .leftJoinAndSelect('group.users', 'user')
            .leftJoinAndSelect('group.messages', 'message')
            .where('group.id=:id', { id })
            .getOne();
        if (!group) {
            throw new common_1.HttpException({
                status: 404,
                errors: {
                    group: 'Group Not Found',
                },
            }, 404);
        }
        return group;
    }
    async addMessage(group_id, updateGroupDto) {
        if (!updateGroupDto.message) {
            throw new common_1.BadRequestException({
                error: 'Should provide a message',
            });
        }
        return this.groupsRepo
            .createQueryBuilder()
            .relation(group_entity_1.Group, 'messages')
            .of(group_id)
            .update(updateGroupDto.message);
    }
    async updateGroup(group_id, updateGroupDto) {
        const group = await this.groupsRepo
            .createQueryBuilder('group')
            .leftJoinAndSelect('group.messages', 'message')
            .where('group.id=:id', { id: group_id })
            .getOne();
        try {
            if (updateGroupDto.user) {
                await this.groupsRepo
                    .createQueryBuilder('group')
                    .relation(group_entity_1.Group, 'users')
                    .of(group)
                    .addAndRemove([...group.users, updateGroupDto.user], group.users);
                group.users = await this.groupsRepo
                    .createQueryBuilder('group')
                    .leftJoinAndSelect('group.messages', 'message')
                    .where('group.id = :id', { id: group.id })
                    .getOne()
                    .then((group) => group.users);
            }
        }
        catch (_a) {
            throw new common_1.BadRequestException('User is Already in This Group');
        }
        if (updateGroupDto.message) {
            group.messages = [...group.messages, updateGroupDto.message];
        }
        return this.groupsRepo.save(group);
    }
    deleteGroups() {
        return this.groupsRepo.delete(1);
    }
};
GroupsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(group_entity_1.Group)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GroupsService);
exports.GroupsService = GroupsService;
//# sourceMappingURL=groups.service.js.map