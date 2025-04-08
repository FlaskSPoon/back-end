import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsNotEmpty, IsISO8601 } from 'class-validator';

export class CreateWebinaireDto {


  @ApiProperty()
  @IsString()
  title: string;


  @ApiProperty()
  @IsString()
  description: string;


  @ApiProperty()
  @IsISO8601()
  dateWebinaire: string;

  @ApiProperty()
  @IsNotEmpty()
    categoryId: number;
 
}
