import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'; // Ajout de NotFoundException
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class UserService {
  constructor(private readonly prisma: DatabaseService,private readonly database: DatabaseService,) {}

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

  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, data: any) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
// async updateRole(adminId: number, userId: number, newRole: string) {
//     // Vérifie si l'utilisateur qui demande la modification est un ADMIN
//     const admin = await this.database.user.findUnique({
//       where: { id: adminId },
//       include: { role: true },
//     });
  
//     if (!admin || admin.role.name !== 'ADMIN') {
//       throw new ForbiddenException("Seuls les administrateurs peuvent modifier les rôles");
//     }
  
//     // Vérifie si l'admin essaie de modifier son propre rôle
//     if (adminId === userId) {
//       throw new ForbiddenException("Vous ne pouvez pas modifier votre propre rôle");
//     }
  
//     // Vérifie si l'utilisateur cible existe
//     const user = await this.database.user.findUnique({
//       where: { id: userId },
//     });
  
//     if (!user) {
//       throw new NotFoundException(`L'utilisateur avec ID ${userId} n'existe pas`);
//     }
  
//     // Vérifie si le rôle demandé existe
//     const role = await this.database.role.findUnique({
//       where: { name: newRole.toUpperCase() },
//     });
  
//     if (!role) {
//       throw new NotFoundException(`Le rôle '${newRole}' n'existe pas`);
//     }
  
//     // Mise à jour du rôle de l'utilisateur
//     await this.database.user.update({
//       where: { id: userId },
//       data: { role: { connect: { id: role.id } } },
//     });
  
//     return { message: `Rôle de l'utilisateur ID ${userId} mis à jour en ${newRole}` };
//   }
  
}
