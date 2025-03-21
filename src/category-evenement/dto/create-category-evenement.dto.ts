import { IsOptional, IsString } from "class-validator";

export class CreateCategoryEvenementDto {

    @IsString()
    name: string;
  
    @IsOptional()
    @IsString()
    description?: string;
}
