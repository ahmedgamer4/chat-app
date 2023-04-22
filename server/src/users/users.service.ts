import {
  HttpException,
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

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  getUsers(): Promise<User[]> {
    return this.usersRepo.find();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.usersRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.messages', 'message')
      // .leftJoinAndSelect('user.groups', 'group')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new HttpException(
        {
          status: 404,
          errors: {
            user: 'User Not Found',
          },
        },
        404,
      );
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
      throw new HttpException(
        {
          status: 400,
          errors: {
            user: 'email is already used',
          },
        },
        400,
      );
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

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = await this.usersRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.messages', 'message')
      .leftJoinAndSelect('user.groups', 'group')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new NotFoundException(`User with id ${id} is not found`);
    }

    if (updateUserDto.groups) {
      await this.usersRepo
        .createQueryBuilder('user')
        .relation(User, 'groups')
        .of(user)
        .addAndRemove(updateUserDto.groups, user.groups);

      user.groups = await this.usersRepo
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.groups', 'group')
        .where('user.id = :id', { id: user.id })
        .getOne()
        .then((user: User) => user.groups);

      console.log(user.groups);
    }

    if (updateUserDto.messages) {
      await this.usersRepo
        .createQueryBuilder('user')
        .relation(User, 'messages')
        .of(user)
        .addAndRemove(updateUserDto.messages, user.messages);

      user.messages = await this.usersRepo
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.messages', 'message')
        .where('user.id = :id', { id: user.id })
        .getOne()
        .then((user: User) => user.messages);

      console.log(user.messages);
    }

    const passwordHash = updateUserDto.password
      ? await bcrypt.hash(updateUserDto.password, 10)
      : user.passwordHash;

    const { name } = updateUserDto;
    const updatedUser = {
      ...user,
      name,
      passwordHash,
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
