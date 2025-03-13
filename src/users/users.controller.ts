import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './users.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  
  @Get()
  @ApiOkResponse({type:User})
  async findAll(){
    return await this.userService.getUsers();
  }
  
  @Get('/:userId')
  getUser(@Param('userId')userId:number) {
      // console.log('UserId:', userId)
  return this.userService.getUser({
    userId,
  });
 
}
}