import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "./entities/role.entity";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { UserService } from "src/users/users.service";


@Injectable()
export class RoleService {
  constructor (
    @InjectRepository(Role)
      private readonly roleRepository: Repository<Role>){
  
    }
    
create( createRoleDto: CreateRoleDto):Promise<Role>{
    const role=this.roleRepository.create(createRoleDto);
   return this.roleRepository.save(role)
  }


  // findAll() {
  //   return this.roleRepo.find();
  // }

  // findOne(id: number) {
  //   return this.roleRepo.findOne({ where: { id } });
  // }

  // async update(id: number, roleDto: UpdateRoleDto) {
  //   await this.roleRepo.update(id, roleDto);
  //   return this.findOne(id);
  // }

  // async remove(id: number) {
  //   await this.roleRepo.delete(id);
  //   return { deleted: true };
  // }
}
