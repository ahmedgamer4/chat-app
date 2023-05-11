/// <reference types="multer" />
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
export declare class UsersService {
    private usersRepo;
    private cloudinaryService;
    constructor(usersRepo: Repository<User>, cloudinaryService: CloudinaryService);
    getUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    findOne(fields: FindOptionsWhere<User>): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateProfileImage(filename: Express.Multer.File, id: number): Promise<User>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    deleteUser(id: number): Promise<User>;
}
