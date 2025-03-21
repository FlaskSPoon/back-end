import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRessourceDto {

    @IsNotEmpty()
    @IsString()
    titre: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsNotEmpty()
    @IsString()
    contenu: string;
  
    @IsNotEmpty()
    @IsString()
    type: string;
  
    @IsOptional()
    auteurId?: number; 
}
