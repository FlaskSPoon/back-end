import { PartialType } from '@nestjs/swagger';
import { CreateCategorieArticleDto } from './create-categorie-article.dto';

export class UpdateCategorieArticleDto extends PartialType(CreateCategorieArticleDto) {}
