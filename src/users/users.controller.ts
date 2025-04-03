import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Body,
} from '@nestjs/common';
import { UserService } from './users.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOkResponse({ type: User })
  async findAll() {
    return await this.userService.getUsers();
  }

  @Get('/:userId')
  @ApiOkResponse({ type: User })
  getUser(@Param('userId') userId: number) {
    return this.userService.getUser({ userId });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() data: any) {
    return this.userService.update(+id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
