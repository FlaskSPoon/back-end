import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly database: DatabaseService) {}

  async getUsers() {
    return this.database.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
      },
    });
  }

  async getUser({ userId }: { userId: number }) {
    const user = await this.database.user.findUnique({
      where: { id: userId },
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

  async findOne(id: number) {
    return this.database.user.findUnique({ where: { id } });
  }

  async update(id: number, data: any) {
    return this.database.user.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.database.user.delete({ where: { id } });
  }
}
