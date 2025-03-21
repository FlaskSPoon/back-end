import { PartialType } from '@nestjs/swagger';
import { CreateCategoryServiceDto } from './create-category-service.dto';

export class UpdateCategoryServiceDto extends PartialType(CreateCategoryServiceDto) {}
