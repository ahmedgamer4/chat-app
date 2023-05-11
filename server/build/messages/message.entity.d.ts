import { Group } from '../groups/group.entity';
import { User } from '../users/user.entity';
export declare class Message {
    id: number;
    content: string;
    username: string;
    user_id: number;
    user_photo: string;
    date: Date;
    user: User;
    group: Group;
}
