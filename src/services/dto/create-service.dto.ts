import { IsDateString, IsDecimal, IsInt, IsOptional, IsString } from "class-validator";

export class CreateServiceDto {
    @IsString()
    name: string;
  
    
  @IsString()
  description: string;

    @IsOptional()
    @IsDecimal()
    price?: number;
  
    @IsDateString()
    createdAt :string
    @IsDateString()
    updatedAt :string
    @IsOptional()
    @IsInt() 
    categoryId?: number;
}
