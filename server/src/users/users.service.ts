import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private cloudinaryService: CloudinaryService,
  ) {}

  getUsers(): Promise<User[]> {
    return this.usersRepo.find();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.usersRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.messages', 'message')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return user;
  }

  findOne(fields: FindOptionsWhere<User>): Promise<User> {
    return this.usersRepo.findOne({
      where: fields,
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findOne({ email: createUserDto.email });
    if (user) {
      throw new BadRequestException('Email is Already User');
    }
    const passwordHash: string = await bcrypt.hash(createUserDto.password, 10);

    const { name, email, githubId, googleId, facebookId } = createUserDto;
    const userToCreate = {
      name,
      email,
      githubId,
      googleId,
      facebookId,
      passwordHash,
      messages: [],
      groups: [],
    };
    const newUser = this.usersRepo.create(userToCreate);

    return this.usersRepo.save(newUser);
  }

  async updateProfileImage(filename: Express.Multer.File, id: number) {
    try {
      const uploadedImage = await this.cloudinaryService.uploadImage(filename);

      const userToUpdate = await this.usersRepo.findOne({ where: { id } });

      const userToUpload: User = {
        ...userToUpdate,
        photo: uploadedImage.url,
      };

      const userToSave = this.usersRepo.create(userToUpload);

      return this.usersRepo.save(userToSave);
    } catch (error) {
      throw new BadRequestException({
        error,
      });
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = await this.usersRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.messages', 'message')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new NotFoundException(`User with id ${id} is not found`);
    }

    if (updateUserDto.message) {
      await this.usersRepo
        .createQueryBuilder('user')
        .relation(User, 'messages')
        .of(user)
        .addAndRemove([updateUserDto.message, ...user.messages], user.messages);

      user.messages = await this.usersRepo
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.messages', 'message')
        .where('user.id = :id', { id: user.id })
        .getOne()
        .then((user: User) => user.messages);
    }

    const passwordHash = updateUserDto.password
      ? await bcrypt.hash(updateUserDto.password, 10)
      : user.passwordHash;

    const { name, bio, photo, phone, password } = updateUserDto;
    const updatedUser = {
      ...user,
      name,
      passwordHash,
      bio,
      photo,
      phone,
      password,
    };

    const userToUpload = this.usersRepo.create(updatedUser);

    return this.usersRepo.save(userToUpload);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getUserById(id);

    await this.usersRepo.remove(user);

    return user;
  }
}
