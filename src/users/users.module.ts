import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController} from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DatabaseService } from 'src/database/database.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[PrismaModule],
  controllers: [UserController],
  providers: [UserService,PrismaService,DatabaseService],
})
export class UsersModule {}
