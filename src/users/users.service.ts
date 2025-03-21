import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class UserService {
  constructor(@Inject(forwardRef(() => RoleService))
    private readonly database: DatabaseService,
  private readonly prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
      },
    });
  }

  async getUser({ userId }: { userId: number }) {
    const id = Number(userId);
    const user = await this.prisma.user.findUnique({
      where: { id},
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
    return await this.database.user.findUnique({ where: { id } });
  }

  async update(id: number, data: any) {
    return await this.database.user.update({ where: { id }, data });
  }

  async remove(id: number) {
    return await this.database.user.delete({ where: { id } });
  }
}
