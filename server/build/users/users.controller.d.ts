/// <reference types="multer" />
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateProfileImage(req: any, file: Express.Multer.File): Promise<User>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    deleteUser(id: number): Promise<User>;
}
