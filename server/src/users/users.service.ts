import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { create } from 'domain';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  getUsers(): Promise<User[]> {
    return this.usersRepo.find();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { id } });

    if (!user) {
      throw new Error('User Not Found');
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);

    const userToCreate = {
      ...createUserDto,
      passwordHash,
      messages: [],
      groups: [],
    };
    const newUser = this.usersRepo.create(userToCreate);

    return this.usersRepo.save(newUser);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = await this.getUserById(id);

    const passwordHash = await bcrypt.hash(updateUserDto.password, 10);

    const updatedUser = {
      ...user,
      ...updateUserDto,
      passwordHash,
    };

    return this.usersRepo.save(updatedUser);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getUserById(id);

    await this.usersRepo.remove(user);

    return user;
  }
}
