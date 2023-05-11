import { GroupsService } from '../groups/groups.service';
import { Message } from '../messages/message.entity';
import { MessagesService } from '../messages/messages.service';
import { IPayload } from './chat.gateway';
export declare class ChatService {
    private messagesService;
    private groupsService;
    constructor(messagesService: MessagesService, groupsService: GroupsService);
    findAllMessages(): Promise<Message[]>;
    findAllMessagesInGroup(group_id: number): Promise<Message[]>;
    createMessage(payload: IPayload): Promise<Message>;
}
