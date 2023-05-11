import { Logger } from '@nestjs/common';
import { Server } from 'socket.io';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { User } from 'src/users/user.entity';
import { ChatService } from './chat.service';
export type IPayload = {
    group_id: number;
    user: User;
} & CreateMessageDto;
export declare class ChatGateway {
    private chatService;
    server: Server;
    constructor(chatService: ChatService);
    logger: Logger;
    handleConnection(client: any): void;
    handleDisconnect(client: any): void;
    findAllMessages(): Promise<import("../messages/message.entity").Message[]>;
    findAllMessagesInGroup(group_id: number): Promise<import("../messages/message.entity").Message[]>;
    createMessage(payload: IPayload): Promise<import("../messages/message.entity").Message>;
}
