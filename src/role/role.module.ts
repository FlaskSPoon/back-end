import { forwardRef, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseService } from 'src/database/database.service';


@Module({
  imports:[TypeOrmModule.forFeature([Role]), forwardRef(() => UsersModule)],
  controllers: [RoleController],
  providers: [RoleService,AuthService,DatabaseService],
  exports: [RoleService],
})
export class RoleModule {


}
