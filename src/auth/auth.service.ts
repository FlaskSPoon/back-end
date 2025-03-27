import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
  ForbiddenException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { UserPayload } from './jwt.strategy';
import { DatabaseService } from 'src/database/database.service';

interface AuthBody {
  email: string;
  password: string;
}

interface CreateUser {
  email: string;
  username: string;
  password: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly database: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async login(authBody: AuthBody): Promise<{ access_token: string }> {
    const { email, password } = authBody;

    const user = await this.database.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) {
      throw new UnauthorizedException("L'utilisateur n'existe pas");
    }

    const isPasswordValid = await this.comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Le mot de passe est invalide');
    }

    return this.generateToken(user.id.toString(), user.role.name);
  }

  async register(createUser: CreateUser): Promise<{ access_token: string }> {
    const { email, username, password, role } = createUser;

    const existingUser = await this.database.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException(
        'Un compte existe déjà avec cette adresse email',
      );
    }

    const hashedPassword = await this.hashPassword(password);

    const roleToConnect = await this.validateRole(role);

    const user = await this.database.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        role: {
          connect: { id: roleToConnect.id },
        },
      },
    });

    return this.generateToken(user.id.toString(), roleToConnect.name);
  }

  async update(userId: number, updateData: Partial<{ email: string; username: string; roleId: number }>) {
    // Vérifie si l’utilisateur existe
    const user = await this.database.user.findUnique({
      where: { id: userId },
    });
  
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
  
    // Prépare les données à mettre à jour
    const dataToUpdate: any = {
      email: updateData.email,
      username: updateData.username,
    };
  
    // Vérifie si `roleId` est bien fourni et valide
    if (updateData.roleId) {
      const role = await this.database.role.findUnique({
        where: { id: updateData.roleId },
      });
  
      if (!role) {
        throw new NotFoundException(`Le rôle avec ID ${updateData.roleId} n'existe pas`);
      }
  
      dataToUpdate.role = {
        connect: { id: updateData.roleId },
      };
    }
  
    // Exécute la mise à jour
    const updatedUser = await this.database.user.update({
      where: { id: userId },
      data: dataToUpdate,
    });
  
    return { message: 'Utilisateur modifié avec succès', user: updatedUser };
  }
  

  async delete(userId: number) {
    const user = await this.database.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    const deletedUser = await this.database.user.delete({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    return { message: 'Utilisateur supprimé avec succès', user: deletedUser };
  }

  private async validateRole(roleName: string) {
    if (!roleName) {
      throw new Error('Role name is required');
    }
  
    const role = await this.database.role.findUnique({
      where: { name: roleName }, 
    });
  
    if (!role) {
      throw new Error(`Role "${roleName}" not found`);
    }
  
    return role;
  }
  

  private async hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  private async comparePassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(plainTextPassword, hashedPassword);
  }

  private async generateToken(
    userId: string,
    role: string,
  ): Promise<{ access_token: string }> {
    const payload: UserPayload = { userId, role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async updateRole(adminId: string, userId: string, newRole: string) {
    const admin = await this.database.user.findUnique({
      where: { id: Number(adminId) },
      include: { role: true },
    });
  
    if (!admin || admin.role.name !== 'ADMIN') {
      throw new ForbiddenException("Seuls les administrateurs peuvent modifier les rôles");
    }
  
    if (Number(adminId) === Number(userId)) {
      throw new ForbiddenException("Vous ne pouvez pas modifier votre propre rôle");
    }
  
    const user = await this.database.user.findUnique({
      where: { id: Number(userId) }, 
    });
  
    if (!user) {
      throw new NotFoundException(`L'utilisateur avec ID ${userId} n'existe pas`);
    }
  
    const role = await this.database.role.findUnique({
      where: { name: newRole.toUpperCase() },
    });
  
    if (!role) {
      throw new NotFoundException(`Le rôle '${newRole}' n'existe pas`);
    }
  
    await this.database.user.update({
      where: { id: Number(userId) }, 
      data: { role: { connect: { id: role.id } } },
    });
  
    return { message: `Rôle de l'utilisateur ID ${userId} mis à jour en ${newRole}` };
  }
  
  
}