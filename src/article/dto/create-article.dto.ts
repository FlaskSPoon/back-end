import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateArticleDto{

@ApiProperty()
  @IsString()
  @IsNotEmpty()
  titre: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsDateString()
  datePublication: string; 

  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsBoolean()
  statut: boolean; 
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;


}
