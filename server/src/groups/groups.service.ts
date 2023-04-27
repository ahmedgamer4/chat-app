import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { Group } from './group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { User } from 'src/users/user.entity';
import { MessagesService } from '../messages/messages.service';
import { UsersService } from '../users/users.service';
import { UpdateGroupDto } from './dto/update-group.dto';
import { userInfo } from 'os';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private groupsRepo: Repository<Group>,
    private messagesService: MessagesService,
    private usersService: UsersService,
  ) {}

  getAllGroups(): Promise<Group[]> {
    return this.groupsRepo.find();
  }

  getAllGroupsWithLimit(limit: number): Promise<Group[]> {
    return this.groupsRepo.createQueryBuilder().limit(limit).getMany();
  }

  createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    const groupToCreate = {
      ...createGroupDto,
      messages: [],
      users: [],
    };

    const newGroup = this.groupsRepo.create(groupToCreate);
    return this.groupsRepo.save(newGroup);
  }

  async getGroupByName(name: string): Promise<Group> {
    const group = await this.groupsRepo.findOne({ where: { name } });

    if (!group) {
      throw new HttpException(
        {
          status: 404,
          errors: {
            group: 'Group Not Found',
          },
        },
        404,
      );
    }

    return group;
  }

  async getGroupById(id: number): Promise<Group> {
    const group = await this.groupsRepo
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.users', 'user')
      .leftJoinAndSelect('group.messages', 'message')
      .where('group.id=:id', { id })
      .getOne();

    if (!group) {
      throw new HttpException(
        {
          status: 404,
          errors: {
            group: 'Group Not Found',
          },
        },
        404,
      );
    }

    return group;
  }

  async updateGroup(
    group_id: number,
    req: any,
    updateGroupDto: UpdateGroupDto,
  ) {
    const group = await this.groupsRepo
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.messages', 'message')
      .where('group.id=:id', { id: group_id })
      .getOne();

    try {
      if (updateGroupDto.user) {
        await this.groupsRepo
          .createQueryBuilder('group')
          .relation(Group, 'users')
          .of(group)
          .addAndRemove([...group.users, updateGroupDto.user], group.users);

        group.users = await this.groupsRepo
          .createQueryBuilder('group')
          .leftJoinAndSelect('group.messages', 'message')
          .where('group.id = :id', { id: group.id })
          .getOne()
          .then((group: Group) => group.users);
      }
    } catch {
      throw new BadRequestException('User is Already in This Group');
    }
    if (updateGroupDto.message) {
      group.messages = [...group.messages, updateGroupDto.message];
    }

    return this.groupsRepo.save(group);
  }

  deleteGroups() {
    return this.groupsRepo.delete(1);
  }
}
