import { Message } from '../../messages/message.entity';
export declare class UpdateUserDto {
    name?: string;
    password?: string;
    message?: Message;
    bio?: string;
    phone?: string;
    photo?: string;
}
