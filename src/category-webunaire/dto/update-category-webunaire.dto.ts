import { PartialType } from '@nestjs/swagger';
import { CreateCategoryWebunaireDto } from './create-category-webunaire.dto';

export class UpdateCategoryWebunaireDto extends PartialType(CreateCategoryWebunaireDto) {}
