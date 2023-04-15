import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(@Query('profession') profession: string) {
    return this.usersService.getUsers(profession);
  }

  @Get(':id')
  // @HttpCode(404)
  getUser(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.usersService.getUser(id);
    } catch (_error) {
      throw new NotFoundException('User Not Found');
    }
  }

  @Post()
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.usersService.deleteUser(id);
  }
}
