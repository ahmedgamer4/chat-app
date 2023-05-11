import type { Group } from '../groups/group.entity';
import type { Message } from '../messages/message.entity';
import { Relation } from 'typeorm';
export declare class User {
    id: number;
    name: string;
    email: string;
    passwordHash: string;
    messages: Relation<Message[]>;
    groups: Relation<Group[]>;
    bio?: string;
    photo?: string;
    phone?: string;
    googleId?: string;
    githubId?: string;
    facebookId?: string;
}
