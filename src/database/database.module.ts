import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports:[UsersModule,AuthModule,JwtModule,RoleModule],
  providers: [DatabaseService, AuthService,JwtService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
