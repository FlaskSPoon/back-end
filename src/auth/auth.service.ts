// auth.service.ts
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
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './login.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly database: DatabaseService, 
    private readonly jwtService: JwtService,    
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    if (!loginDto.email?.trim() || !loginDto.password?.trim()) {
      throw new BadRequestException('Email et mot de passe requis');
    }
  
    const user = await this.database.user.findUnique({
      where: { email: loginDto.email.trim() },
      include: { role: true },
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
  
    return this.generateToken(user.id.toString(), user.role.name);
  }
  async register(createUserDto: CreateUserDto): Promise<{ access_token: string }> {
    const { email, username, password, role } = createUserDto;

   
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    if (!password) {
      throw new BadRequestException('Password is required');
    }

    
    const existingUser = await this.database.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Un compte existe déjà avec cette adresse email');
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

 
  private async comparePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return compare(plainTextPassword, hashedPassword);
  }

 
  private async generateToken(userId: string, role: string): Promise<{ access_token: string }> {
    const payload = { userId, role };
    return {
      access_token: this.jwtService.sign(payload), 
    };
  }

 
  // async login(createUserDto: CreateUserDto): Promise<{ access_token: string }> {
  //   const { email,  password } = createUserDto;
  //      console.log(createUserDto)
  //   if (!email) {
  //     throw new BadRequestException('Email is required');
  //   }
  //   if (!password) {
  //     throw new BadRequestException('Password is required');
  //   }

   
  //   const user = await this.database.user.findUnique({
     
  //     where: { email: createUserDto.email },
  //     include: { role: true },
  //   }).catch((error) => {
  //     throw new InternalServerErrorException('Authentication failed');
  //   });
  //   if (!user) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }

  //   const passwordValid = await this.comparePassword(createUserDto.password, user.password);
  //   if (!passwordValid) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }

  
  //   return this.generateToken(user.id.toString(), user.role.name);
  // }

  async update(userId: number, updateData: Partial<{ email: string; username: string; roleId: number }>) {
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

    if (updateData.roleId) {
      const role = await this.database.role.findUnique({
        where: { id: updateData.roleId },
      });

      if (!role) {
        throw new NotFoundException(`Le rôle avec ID ${updateData.roleId} n'existe pas`);
      }

      dataToUpdate.role = { connect: { id: updateData.roleId } };
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
