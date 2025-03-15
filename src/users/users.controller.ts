import { Controller, Post, Body, Get, Param, Put, Delete, Patch, UseGuards, Request } from '@nestjs/common';
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
  @ApiOkResponse({ type: User })
  async findAll() {
    return await this.userService.getUsers();
  }

  @Get('/:userId')
   
  getUser(@Param('userId') userId: number) {
    return this.userService.getUser({ userId });
  }

  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  
  @Patch(':id')
  // @Roles('ADMIN')
  // @UseGuards(AuthGuard('jwt')) 
  async update(@Param('id') id: string, @Body() data: any) {
    return this.userService.update(+id, data);
  }

  
  @Delete(':id')

  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

//   @Patch(':id/role')
// @Roles('ADMIN') // Seul un ADMIN peut modifier le rôle
// @UseGuards(AuthGuard('jwt'), RolesGuard)
// async updateUserRole(
//   @Request() req, // Récupérer l'admin qui fait la requête
//   @Param('id') userId: number,
//   @Body('role') newRole: string,
// ) {
//   return this.userService.updateRole(req.user.userId, Number(userId), newRole);
// }
}
