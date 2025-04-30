import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail({}, { message: 'Doit être une adresse email valide' })
    @IsNotEmpty({ message: 'Email requis' })
    email: string;

  
    @ApiProperty({ example: 'votre Mot DePasse' })
    @IsString({ message: 'Doit être une chaîne de caractères' })
    @IsNotEmpty({ message: 'Mot de passe requis' })
    password: string;
  }