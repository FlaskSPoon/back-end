import { IsOptional, IsString } from 'class-validator';

export class FilterArticlesDto {
  @IsOptional()
  @IsString()
  titre?: string;  

  @IsOptional()
  @IsString()
  statut?: string;  

  @IsOptional()
  @IsString()
  category?: string;  
}
