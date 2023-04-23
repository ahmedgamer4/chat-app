import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { Group } from './group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { User } from 'src/users/user.entity';
import { create } from 'domain';
import { Message } from 'src/messages/message.entity';

@Injectable()
export class GroupsService {
  constructor(@InjectRepository(Group) private groupsRepo: Repository<Group>) {}

  getAllGroups(): Promise<Group[]> {
    return this.groupsRepo.find();
  }

  createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    const groupToCreate = {
      ...createGroupDto,
      messages: [],
      users: [],
    };

    const newGroup = this.groupsRepo.create(groupToCreate);
    console.log(newGroup);

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

  async addUser(id: number, user: User): Promise<Group> {
    const group = await this.getGroupById(id);

    const updatedGroup = {
      ...group,
      users: group.users.concat(user),
    };

    return this.groupsRepo.save(this.groupsRepo.create(updatedGroup));
  }

  async addMessage(group_id: number, req: any, message_id: number) {
    const group = await this.groupsRepo
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.messages', 'message')
      .where('group.id=:id', { id: group_id })
      .getOne();

    await this.groupsRepo
      .createQueryBuilder('group')
      .relation(Group, 'messages')
      .of(group)
      .addAndRemove(
        [...group.messages.map((m: Message) => m.id), message_id],
        group.messages,
      );

    group.messages = await this.groupsRepo
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.messages', 'message')
      .where('group.id=:id', { id: group.id })
      .getOne()
      .then((group: Group) => group.messages);

    return this.groupsRepo.save(group);
  }

  deleteGroups() {
    return this.groupsRepo.delete(1);
  }
}
