import { ApiProperty } from "@nestjs/swagger";
import { ArticleStatut } from "@prisma/client";
import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

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
  @IsEnum(ArticleStatut)
  statut: ArticleStatut; 
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;


}
