import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './group.entity';
import { GroupsService } from './groups.service';

@ApiTags('Groups')
@Controller('api/groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @ApiOkResponse({ type: Group, isArray: true })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAllGroups(): Promise<Group[]> {
    return this.groupsService.getAllGroups();
  }

  @ApiOkResponse({ type: Group })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getGroupById(@Param('id', ParseIntPipe) id: number): Promise<Group> {
    return this.groupsService.getGroupById(id);
  }

  @ApiCreatedResponse({ type: Group })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createGroup(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupsService.createGroup(createGroupDto);
  }
}
