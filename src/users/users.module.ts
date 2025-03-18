import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController} from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModule } from 'src/database/database.module';
import { RoleService } from 'src/role/role.service';
import { RoleModule } from 'src/role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  
  imports: [PrismaModule,TypeOrmModule.forFeature([User]),RoleModule], 
  controllers: [UserController],
  providers: [UserService,PrismaService,DatabaseService],
  exports: [UserService, TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
