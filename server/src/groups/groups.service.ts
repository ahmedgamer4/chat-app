import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { Message } from '../messages/message.entity';
import { User } from 'src/users/user.entity';
import { MessagesService } from 'src/messages/messages.service';

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
    const group = await this.groupsRepo.findOne({ where: { id } });

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

  async addMessage(id: number, message: Message): Promise<Group> {
    const group = await this.getGroupById(id);

    const updatedGroup = {
      ...group,
      messages: group.messages.concat(message),
    };

    return this.groupsRepo.save(this.groupsRepo.create(updatedGroup));
  }

  deleteGroups() {
    return this.groupsRepo.delete(1);
  }
}
