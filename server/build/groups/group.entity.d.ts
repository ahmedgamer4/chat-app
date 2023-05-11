import type { Message } from '../messages/message.entity';
import type { User } from '../users/user.entity';
import { Relation } from 'typeorm';
export declare class Group {
    id: number;
    name: string;
    description: string;
    messages: Relation<Message[]>;
    users: Relation<User[]>;
}
