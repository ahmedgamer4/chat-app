import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: User, isArray: true })
  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    try {
      return this.usersService.getUserById(id);
    } catch (_error) {
      throw new NotFoundException('User Not Found');
    }
  }

  @ApiCreatedResponse({ type: User })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    await this.usersService.updateUser(id, updateUserDto);
    return this.usersService.getUserById(id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
