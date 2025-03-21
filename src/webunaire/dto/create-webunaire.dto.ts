import { IsString, IsDateString } from 'class-validator';

export class CreateWebinaireDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  dateWebinaire: string;

  categoryId: number;
}
