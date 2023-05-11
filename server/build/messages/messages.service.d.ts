import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './message.entity';
export declare class MessagesService {
    private messagesRepo;
    constructor(messagesRepo: Repository<Message>);
    getMessages(group_id?: number): Promise<Message[]>;
    createMessage(createMessageDto: CreateMessageDto, req: any): Promise<Message>;
}
