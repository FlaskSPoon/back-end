import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsDecimal, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateServiceDto {
    @IsString()
    name: string;
  
    

    @ApiProperty()
  @IsString()
  description: string;


  @ApiProperty()
  @IsNumber()
  @IsPositive()
    price?: number;
  

    @ApiProperty()
    @IsDateString()
    createdAt :string

    @ApiProperty()
    @IsDateString()
    updatedAt :string

  @ApiProperty()
  @IsNotEmpty()
    categoryId: number;
}
