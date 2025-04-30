import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './login.dto';
import { ROLE } from '@prisma/client'; 

@Injectable()
export class AuthService {
  constructor(
    private readonly database: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string; user: any }> {
    //console.log('tantive de connexion pour',loginDto.email)
    if (!loginDto.email?.trim() || !loginDto.password?.trim()) {
      throw new BadRequestException('Email et mot de passe requis');
    }
    console.log('Mot de passe fourni :', loginDto.password);

    const user = await this.database.user.findUnique({
      where: { email: loginDto.email.trim() },
      
    }).catch(error => {
      console.error('Erreur DB:', error);
      throw new InternalServerErrorException('Erreur de connexion');
    });
    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const passwordValid = await this.comparePassword(loginDto.password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const payload = { userId: user.id.toString(), role: user.role };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    };
  }

  async register(createUserDto: CreateUserDto): Promise<{ access_token: string }> {
    //console.log('données envoyés', createUserDto);
  
    const { 
      username, 
      email, 
      password, 
      status,
      role = 'ROLE_USER' 
    } = createUserDto;
  
    // Modifier la validation
    if (!email || !password) {
      throw new BadRequestException('Email et mot de passe requis');
    }
    if (!email || !password || !role) {
      throw new BadRequestException('Email, mot de passe et rôle requis');
    }
    //console.log('données envoyés', createUserDto);
    const existingUser = await this.database.user.findUnique({
      where: { email },
    });
  
    if (existingUser) {
      throw new ConflictException('Un compte existe déjà avec cette adresse email');
    }
  
    const hashedPassword = await this.hashPassword(password);
  
    const roleEnum = this.validateRole(role); 
  
    console.log('Données validées pour la création :', { email, username, status, roleEnum });
  
    const user = await this.database.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        status,
        role: roleEnum,
      },
    });
  
    return this.generateToken(user.id.toString(), user.role);
  }
  
  private validateRole(roleName: string): ROLE {
    console.log('Rôle reçu pour validation:', roleName);
    if (!roleName) {
      throw new BadRequestException('Le rôle est requis');
    }
    const upper = roleName.toUpperCase();
    console.log('Role validé :', upper);
  
    if (!(upper in ROLE)) {
      throw new BadRequestException(`Rôle "${roleName}" invalide`);
    }
  
    return ROLE[upper as keyof typeof ROLE];
  }
  

  private async hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  private async comparePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    console.log('Comparaison entre :', plainTextPassword, 'et', hashedPassword);
    return compare(plainTextPassword, hashedPassword);
  }

  private async generateToken(userId: string, role: ROLE): Promise<{ access_token: string }> {
    const payload = { userId, role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async update(userId: number, updateData: Partial<{ email: string; username: string; role: ROLE }>) {
    const user = await this.database.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    const dataToUpdate: any = {
      email: updateData.email,
      username: updateData.username,
    };

    if (updateData.role) {
      dataToUpdate.role = this.validateRole(updateData.role);
    }

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
      select: { id: true, email: true, username: true },
    });

    return { message: 'Utilisateur supprimé avec succès', user: deletedUser };
  }

  async updateRole(adminId: string, userId: string, newRole: string) {
    const admin = await this.database.user.findUnique({
      where: { id: Number(adminId) },
    });

    if (!admin || admin.role !== ROLE.ROLE_ADMIN) {
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

    const validatedRole = this.validateRole(newRole);

    await this.database.user.update({
      where: { id: Number(userId) },
      data: { role: validatedRole },
    });

    return { message: `Rôle de l'utilisateur ID ${userId} mis à jour en ${newRole}` };
  }

  async updateFullUser(userId: number, updateUserDto: { email: string; username: string; role: string }) {
    const user = await this.database.user.findUnique({
      where: { id: userId },
    });
  
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
  
    const validatedRole = this.validateRole(updateUserDto.role);
  
    const updatedUser = await this.database.user.update({
      where: { id: userId },
      data: {
        email: updateUserDto.email,
        username: updateUserDto.username,
        role: validatedRole,
      },
    });
  
    return { message: 'Utilisateur mis à jour ', user: updatedUser };
  }
  
}
