import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports:[UsersModule,AuthModule,JwtModule],
  providers: [DatabaseService, AuthService,JwtService]
})
export class DatabaseModule {}
