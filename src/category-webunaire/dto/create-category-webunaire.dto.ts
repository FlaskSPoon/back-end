import { IsOptional, IsString } from "class-validator";

export class CreateCategoryWebunaireDto {

    @IsString()
    name: string;
  
    @IsOptional()
    @IsString()
    description?: string;
}
