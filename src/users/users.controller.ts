import { Controller, Get, Param, Patch, Delete, UseGuards, Request, Body, ParseIntPipe } from '@nestjs/common';
import { UserService } from './users.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard'; 
import { AuthGuard } from '@nestjs/passport'; 

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOkResponse({ type: [User] })
  async findAll() {
    return this.userService.getUsers();
  }

  @Get('profile') 
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() req) {
    return this.userService.getUser({ userId: req.user.id });
  }

  @Get(':id') 
  @Roles('ADMIN') 
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
