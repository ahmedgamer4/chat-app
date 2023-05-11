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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const groups_service_1 = require("../groups/groups.service");
const messages_service_1 = require("../messages/messages.service");
let ChatService = class ChatService {
    constructor(messagesService, groupsService) {
        this.messagesService = messagesService;
        this.groupsService = groupsService;
    }
    findAllMessages() {
        return this.messagesService.getMessages();
    }
    async findAllMessagesInGroup(group_id) {
        const group = await this.groupsService.getGroupById(group_id);
        return group.messages;
    }
    async createMessage(payload) {
        const message = await this.messagesService.createMessage({ content: payload.content }, {
            user_id: payload.user.id,
            user_photo: payload.user.photo,
            username: payload.user.name,
        });
        await this.groupsService.addMessage(payload.group_id, {
            message,
        });
        console.log(message);
        return message;
    }
};
ChatService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.DEFAULT }),
    __metadata("design:paramtypes", [messages_service_1.MessagesService,
        groups_service_1.GroupsService])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map