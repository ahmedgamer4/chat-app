import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../user.entity';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Smith',
      phone: '+15145551234',
      profession: 'Software Engineer',
    },
    {
      id: 2,
      name: 'Jane Doe',
      phone: '+15145552345',
      profession: 'Marketing Manager',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      phone: '+15145553456',
      profession: 'Graphic Designer',
    },
    {
      id: 4,
      name: 'Emily Davis',
      phone: '+15145554567',
      profession: 'Data Analyst',
    },
    {
      id: 5,
      name: 'Alex Brown',
      phone: '+15145555678',
      profession: 'Product Manager',
    },
  ];

  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  getUsers(profession?: string) {
    if (profession) {
      return this.users.filter((u) => u.profession === profession);
    }
    return this.users;
  }

  getUser(id: number) {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  createUser(createUserDto: CreateUserDto) {
    const userToAdd = {
      ...createUserDto,
      id: Math.round(Math.random() * 10000),
    };
    this.users.push(userToAdd);
    console.log(userToAdd);
    return JSON.parse(JSON.stringify(userToAdd));
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updateUserDto,
        };
      }
      return user;
    });

    return this.getUser(id);
  }

  deleteUser(id: number) {
    const toBeDeleted = this.users.find((user) => user.id === id);

    this.users = this.users.filter((user) => user.id !== id);

    return toBeDeleted;
  }
}
