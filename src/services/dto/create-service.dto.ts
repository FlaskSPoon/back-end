import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
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
  @Type(() => Number)
    price?: number;
  

    @ApiProperty()
    @IsOptional()
    @IsDateString()
    createdAt :string

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    @IsOptional()
    image: string;


  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category: string;
}
