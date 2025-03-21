import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreatePartenaireDto {

    @IsNotEmpty()
    @IsString()
    nom: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsString()
    logo?: string;
  
    @IsOptional()
    @IsUrl()
    siteWeb?: string;
  
    @IsOptional()
    @IsString()
    contact?: string;
}
