import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    getUsers: jest.fn(),
    getUserById: jest.fn(),
    createUser: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
        messages: [],
        groups: [],
      };
    }),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('can create users', () => {
    const userToCreate = {
      name: 'Ahmed',
      password: 'ahmed123',
      email: 'ahmed@gmail.com',
    };
    expect(controller.createUser(userToCreate)).toEqual({
      id: expect.any(Number),
      name: 'Ahmed',
      password: expect.any(String),
      email: expect.any(String),
      messages: [],
      groups: [],
    });
  });

  it('should return users', () => {});
});
