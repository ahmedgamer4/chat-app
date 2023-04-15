import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../user.entity';
export declare class UsersService {
    private userRepo;
    private users;
    constructor(userRepo: Repository<User>);
    getUsers(profession?: string): {
        id: number;
        name: string;
        phone: string;
        profession: string;
    }[];
    getUser(id: number): {
        id: number;
        name: string;
        phone: string;
        profession: string;
    };
    createUser(createUserDto: CreateUserDto): any;
    updateUser(id: number, updateUserDto: UpdateUserDto): {
        id: number;
        name: string;
        phone: string;
        profession: string;
    };
    deleteUser(id: number): {
        id: number;
        name: string;
        phone: string;
        profession: string;
    };
}
