import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { DatabaseService } from 'src/database/database.service';
import { RoleService } from 'src/role/role.service';

const mockUserService = {
  getUsers: jest.fn(),
  getUser: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};
const mockDataBaseService={

}
const mockRoleService={
  
}
describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: DatabaseService,
          useValue: mockDataBaseService,
        },
        {provide:RoleService,
          useValue:mockRoleService,
        }
      ],
    })
      .overrideGuard(AuthGuard('jwt')) 
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard) 
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UserController>(UserController);
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockUsers = [{ id: 1, email: 'test@example.com', username: 'testuser' }];
      mockUserService.getUsers.mockResolvedValue(mockUsers);

      const result = await controller.findAll();
      expect(result).toEqual(mockUsers);
      expect(mockUserService.getUsers).toHaveBeenCalled();
    });
  });

  describe('getUser', () => {
    it('should return a user by userId', async () => {
      const mockUser = { id: 1, email: 'test@example.com', username: 'testuser' };
      mockUserService.getUser.mockResolvedValue(mockUser);

      const result = await controller.getUser(1);
      expect(result).toEqual(mockUser);
      expect(mockUserService.getUser).toHaveBeenCalledWith({ userId: 1 });
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const mockUser = { id: 1, email: 'test@example.com', username: 'testuser' };
      mockUserService.findOne.mockResolvedValue(mockUser);

      const result = await controller.findOne('1');
      expect(result).toEqual(mockUser);
      expect(mockUserService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const mockUser = { id: 1, email: 'updated@example.com', username: 'updateduser' };
      mockUserService.update.mockResolvedValue(mockUser);

      const result = await controller.update('1', { email: 'updated@example.com' });
      expect(result).toEqual(mockUser);
      expect(mockUserService.update).toHaveBeenCalledWith(1, { email: 'updated@example.com' });
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      mockUserService.remove.mockResolvedValue(true);

      const result = await controller.remove('1');
      expect(result).toBe(true);
      expect(mockUserService.remove).toHaveBeenCalledWith(1);
    });
  });
});