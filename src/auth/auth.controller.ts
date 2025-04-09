/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Put,
  Request,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/users/users.service';
import { JwtAuthGuard } from './auth.guard';
import { Roles } from './roles.decorator';
import {
  ApiOkResponse,
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { RolesGuard } from './roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Connexion utilisateur' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: 'Connexion réussie' })
  @ApiBadRequestResponse({ description: 'Données invalides' })
  @ApiUnauthorizedResponse({ description: 'Identifiants incorrects' })
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors) => {
        const messages = errors.map((error) => {
          if (!error.constraints) {
            return `${error.property} a une erreur de validation`;
          }
          return Object.values(error.constraints).join(', ');
        });

        return new BadRequestException({
          statusCode: 400,
          message: 'Erreur de validation',
          errors: messages,
          timestamp: new Date().toISOString(),
        });
      },
    }),
  )
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.register(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: [User] })
  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('users')
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Put(':id')
  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  async update(
    @Param('id') userId: string,
    @Body()
    updateData: Partial<{ email: string; username: string; roleId: number }>,
  ) {
    try {
      return await this.authService.update(Number(userId), updateData);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':userId')
  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async deleteUser(@Param('userId') userId: string) {
    try {
      return await this.authService.delete(Number(userId));
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @ApiBearerAuth()
  @Patch(':id/role')
  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async updateUserRole(
    @Request() req,
    @Param('id') userId: number,
    @Body('role') newRole: string,
  ) {
    return this.authService.updateRole(
      req.user.userId,
      Number(userId).toString(),
      newRole,
    );
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout user' })
  @UseGuards(JwtAuthGuard)
  async logout() {
    return this.authService.logout();
  }
}
