import { Test, TestingModule } from '@nestjs/testing';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let user: User;
  let usersService: UsersService;
  let usersController: UsersController;

  beforeEach(async () => {
    user = new User();
    usersService = new UsersService(user);
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      controllers: [UsersController],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
