import { Body, Delete, Injectable, Param, Put, UnauthorizedException } from '@nestjs/common';
import { AuthBody, CreateUser } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './jwt.strategy';
import { DatabaseService } from 'src/database/database.service';
import {hash,compare} from 'bcrypt'
import { User } from '@prisma/client';


@Injectable()
export class AuthService {
    constructor(
        private readonly database: DatabaseService,
        private readonly jwtService: JwtService
    ) {}


    async login({ authBody }: { authBody: AuthBody }) {
        const { email, password } = authBody;
    
        const existingUser = await this.database.user.findUnique({
           where:{email}
        });
    
        if (!existingUser) {
            throw new UnauthorizedException("L'utilisateur n'existe pas");
        }
    
        const isPasswordValid = await this.isPasswordValid({
            password,
            hashedPassword: existingUser.password,
        });
    
        if (!isPasswordValid) {
            throw new UnauthorizedException('Le mot de passe est invalide');
        }
    
        return this.authenticateUser({ userId: existingUser.id.toString() });
    }
    

    
    async register({ registerBody }: { registerBody: CreateUser }): Promise<{ access_token: string }>{
        const { email, username, password } = registerBody;

        const existingUser = await this.database.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new UnauthorizedException(
                'Un compte existe déjà avec cette adresse email'
            );
        }

      
        const hashPassword = await this.hashPassword({ password });

        
        const createdUser = await this.database.user.create({
            data: {
                email,
                password: hashPassword,
                username, 
            },
        });

        return this.authenticateUser({ userId: createdUser.id.toString() });
    }

    // 🔹 Hachage du mot de passe
    private async hashPassword({ password }: { password: string }) {
        return await hash(password, 10);
    }

    // 🔹 Vérification du mot de passe
    private async isPasswordValid({
        password,
        hashedPassword,
    }: {
        password: string;
        hashedPassword: string;
    }) {
        return await compare(password, hashedPassword);
    }

   
    private async authenticateUser({ userId }: UserPayload) {
        const payload: UserPayload = { userId };
        return {
            access_token: await this.jwtService.sign(payload),
        };
    }

    @Put(':id')
    async update(userId: number, updateData: Partial<{ email: string; username: string }>) {
        const updatedUser = await this.database.user.update({
            where: { id: userId }, // userId est bien un Int
            data: updateData,
        });
    
        return { message: 'Utilisateur modifié avec succès', user: updatedUser };
    }


    async delete(userId: number) {  // S'assurer que userId est bien un Int
        const deletedUser = await this.database.user.delete({
            where: { id: userId }, // id est bien un nombre
            select: {
                id: true,
                email: true,
                username: true
            }
        });
    
        return { message: 'Utilisateur supprimé avec succès', user: deletedUser };
    }
    
}
