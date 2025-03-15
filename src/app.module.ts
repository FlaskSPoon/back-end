import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './users/users.service';
import { UserController } from './users/users.controller';
import { PrismaModule } from './prisma/prisma.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),TypeOrmModule.forRoot({
    type: 'mysql', // Changez 'postgres' en 'mysql'
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306, 
    username: process.env.DB_USER || 'root', 
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'fireshieldsec',
    
    synchronize: true, 
  }),UsersModule, PrismaModule, DatabaseModule, AuthModule,JwtModule],
  controllers: [UserController],
  providers: [PrismaService, UserService,DatabaseService,AuthService,JwtService],
  exports:[]
})
export class AppModule {}
