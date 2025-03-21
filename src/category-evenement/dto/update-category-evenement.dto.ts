import { PartialType } from '@nestjs/swagger';
import { CreateCategoryEvenementDto } from './create-category-evenement.dto';

export class UpdateCategoryEvenementDto extends PartialType(CreateCategoryEvenementDto) {}
