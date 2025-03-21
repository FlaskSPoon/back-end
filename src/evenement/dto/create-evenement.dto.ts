import { IsString, IsDateString } from 'class-validator';

export class CreateEvenementDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  dateEvenement: string;

  categoryId: number;
}
