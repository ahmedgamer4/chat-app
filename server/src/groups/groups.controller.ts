import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Message } from 'src/messages/message.entity';
import { User } from 'src/users/user.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './group.entity';
import { GroupsService } from './groups.service';

@ApiTags('Groups')
@Controller('api/groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Get()
  getAllGroups(): Promise<Group[]> {
    return this.groupsService.getAllGroups();
  }

  @Get(':id')
  getGroupById(@Param('id', ParseIntPipe) id: number): Promise<Group> {
    return this.groupsService.getGroupById(id);
  }

  @Get()
  getGroupByName(name: string): Promise<Group> {
    return this.groupsService.getGroupByName(name);
  }

  @Post()
  createGroup(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupsService.createGroup(createGroupDto);
  }

  // @Put(':id')
  // addUser(@Param('id', ParseIntPipe) id: number, user: User): Promise<Group> {
  //   return this.groupsService.addUser(id, user);
  // }

  // @Put(':id')
  // addMessage(
  //   @Param('id', ParseIntPipe) id: number,
  //   message: Message,
  // ): Promise<Group> {
  //   return this.groupsService.addMessage(id, message);
  // }
}
