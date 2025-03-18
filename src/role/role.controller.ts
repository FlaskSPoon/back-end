import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { Roles } from "src/auth/roles.decorator";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/auth/roles.guard";
import { Role } from "./entities/role.entity";


@Controller("roles")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
      @Roles('ADMIN')
       @UseGuards(AuthGuard('jwt'), RolesGuard)
     async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
       return await this.roleService.create(createRoleDto);
     }
  
  // @Get()
  // findAll() {
  //   return this.roleService.findAll();
  // }

  // @Get(":id")
  // findOne(@Param("id") id: number) {
  //   return this.roleService.findOne(+id);
  // }

  // @Patch(":id")
  // update(@Param("id") id: number, @Body() updateRoleDto: UpdateRoleDto) {
  //   return this.roleService.update(+id, updateRoleDto);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: number) {
  //   return this.roleService.remove(+id);
  // }
}
