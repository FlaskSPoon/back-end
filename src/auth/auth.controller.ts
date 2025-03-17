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
  ConflictException,
  Put,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/users/users.service';
import { JwtAuthGuard } from './auth.guard';
import { Roles } from './roles.decorator';
import { ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { RolesGuard } from './roles.guard';
import { AuthGuard } from '@nestjs/passport';

// Classes pour les types (au lieu de `export type`)
class AuthBody {
  email: string;
  password: string;
}

class CreateUser {
  email: string;
  username: string;
  password: string;
  role: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiOkResponse({ type: User })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() authBody: AuthBody) {
    try {
      return await this.authService.login(authBody);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @ApiOkResponse({ type: User })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUser: CreateUser) {
    try {
      console.log('Received createUser:', createUser); 
      return await this.authService.register(createUser);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: [User] })
  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)  
  @Get()
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
    @Body() updateData: Partial<{ email: string; username: string; roleId: number }>,
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
  @Patch(':id/role')
@Roles('ADMIN') 
@UseGuards(AuthGuard('jwt'), RolesGuard)
async updateUserRole(
  @Request() req, 
  @Param('id') userId: number,
  @Body('role') newRole: string,
) {
  return this.authService.updateRole(req.user.userId, Number(userId).toString(), newRole);
}

}