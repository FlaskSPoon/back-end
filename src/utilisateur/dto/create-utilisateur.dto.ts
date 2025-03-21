import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUtilisateurDto {

    @IsNotEmpty()
  @IsString()
  nom: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  partenaireId?: number;
}
