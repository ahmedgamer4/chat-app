import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './message.entity';
import { MessagesService } from './messages.service';
export declare class MessagesController {
    private messagesService;
    constructor(messagesService: MessagesService);
    getMessages(group_id?: string): Promise<Message[]>;
    createMessage(createMessageDto: CreateMessageDto, req: any): Promise<Message>;
}
