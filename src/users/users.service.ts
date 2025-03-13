import { Injectable, NotFoundException } from '@nestjs/common'; // Ajout de NotFoundException
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class UserService {
  constructor(private readonly prisma: DatabaseService) {}

  async getUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    return users;
  }

  async getUser({userId}:{userId:number}) {
    const user = await this.prisma.user.findUnique({
      where: { 
        id: userId }   , 
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found'); 
    }

    return user;
  }

  
}
