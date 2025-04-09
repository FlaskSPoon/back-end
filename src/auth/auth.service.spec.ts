import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';
import {
  UnauthorizedException,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let databaseServiceMock: any;
  let jwtServiceMock: any;

  beforeEach(async () => {
    databaseServiceMock = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      role: {
        findUnique: jest.fn(),
      },
    };

    jwtServiceMock = {
      sign: jest.fn().mockReturnValue('mocked-jwt-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: DatabaseService, useValue: databaseServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return access token if credentials are valid', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        password: await hash('password', 10),
        role: { name: 'USER' },
      };
      databaseServiceMock.user.findUnique.mockResolvedValue(user);
      jest.spyOn(authService as any, 'comparePassword').mockResolvedValue(true);

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password',
      });
      expect(result).toEqual({ access_token: 'mocked-jwt-token' });
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      databaseServiceMock.user.findUnique.mockResolvedValue(null);
      await expect(
        authService.login({ email: 'test@example.com', password: 'password' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    it('should create a new user and return a token', async () => {
      const user = {
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
        password: 'hashedpass',
        role: { name: 'USER' },
      };
      databaseServiceMock.user.findUnique.mockResolvedValue(null);
      databaseServiceMock.role.findUnique.mockResolvedValue({
        id: 1,
        name: 'USER',
      });
      databaseServiceMock.user.create.mockResolvedValue(user);
      jest
        .spyOn(authService as any, 'hashPassword')
        .mockResolvedValue('hashedpass');

      const result = await authService.register({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password',
        role: 'USER',
      });
      expect(result).toEqual({ access_token: 'mocked-jwt-token' });
    });

    it('should throw ConflictException if email is already taken', async () => {
      databaseServiceMock.user.findUnique.mockResolvedValue({ id: 1 });
      await expect(
        authService.register({
          email: 'test@example.com',
          username: 'testuser',
          password: 'password',
          role: 'USER',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      databaseServiceMock.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
      });
      databaseServiceMock.user.delete.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
      });
      const result = await authService.delete(1);
      expect(result).toEqual({
        message: 'Utilisateur supprimé avec succès',
        user: { id: 1, email: 'test@example.com' },
      });
    });

    it('should throw NotFoundException if user does not exist', async () => {
      databaseServiceMock.user.findUnique.mockResolvedValue(null);
      await expect(authService.delete(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateRole', () => {
    it('should update a user role if admin', async () => {
      databaseServiceMock.user.findUnique
        .mockResolvedValueOnce({ id: 1, role: { name: 'ADMIN' } })
        .mockResolvedValueOnce({ id: 2, role: { name: 'USER' } });
      databaseServiceMock.role.findUnique.mockResolvedValue({
        id: 3,
        name: 'MODERATOR',
      });
      databaseServiceMock.user.update.mockResolvedValue({
        id: 2,
        role: { name: 'MODERATOR' },
      });

      const result = await authService.updateRole('1', '2', 'MODERATOR');
      expect(result).toEqual({
        message: `Rôle de l'utilisateur ID 2 mis à jour en MODERATOR`,
      });
    });

    it('should throw ForbiddenException if user is not admin', async () => {
      databaseServiceMock.user.findUnique.mockResolvedValue({
        id: 1,
        role: { name: 'USER' },
      });
      await expect(
        authService.updateRole('1', '2', 'MODERATOR'),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});
