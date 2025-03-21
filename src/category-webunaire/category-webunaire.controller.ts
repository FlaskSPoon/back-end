import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryWebunaireService } from './category-webunaire.service';
import { CreateCategoryWebunaireDto } from './dto/create-category-webunaire.dto';
import { UpdateCategoryWebunaireDto } from './dto/update-category-webunaire.dto';

@Controller('catewebunaire')
export class CategoryWebunaireController {
  constructor(private readonly categoryWebinaireService: CategoryWebunaireService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryWebunaireDto) {
    return this.categoryWebinaireService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryWebinaireService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryWebinaireService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryWebunaireDto: UpdateCategoryWebunaireDto) {
    return this.categoryWebinaireService.update(+id, updateCategoryWebunaireDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryWebinaireService.remove(+id);
  }
}
