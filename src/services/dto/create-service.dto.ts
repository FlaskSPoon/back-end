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
  @IsOptional()
  @IsPositive()
    price?: number;
  

    @ApiProperty()
    @IsOptional()
    @IsDateString()
    createdAt :string

    // @ApiProperty()
    // @IsDateString()
    // updatedAt :string

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  categoryId: number;
}
