import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { JwtModule } from '@nestjs/jwt';

import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/users/users.service';
import { DatabaseService } from 'src/database/database.service';
import { RoleModule } from 'src/role/role.module';
import { RoleService } from 'src/role/role.service';
import { DatabaseModule } from 'src/database/database.module';

// import { JwtStrategy } from './jwt.strategy';
 console.log(process.env.JWT_SECRET)
@Module({
  imports: [forwardRef(()=>DatabaseModule),UsersModule,RoleModule,ConfigModule.forRoot(),
 
    JwtModule.register({
    global: true,
    secret:process.env.JWT_SECRET,
    signOptions: { expiresIn: '30d' },
  }),],
  providers: [AuthService,PrismaService,JwtStrategy,UserService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}