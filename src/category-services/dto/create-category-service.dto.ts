import { IsString } from "class-validator";

export class CreateCategoryServiceDto {
    @IsString()
    name: string;
  
}
