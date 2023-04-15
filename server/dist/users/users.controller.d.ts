import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getUsers(profession: string): {
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
    create(createUserDto: CreateUserDto): void;
    update(id: number, updateUserDto: UpdateUserDto): void;
    delete(id: number): void;
}
