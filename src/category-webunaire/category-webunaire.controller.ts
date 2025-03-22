import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryWebunaireService } from './category-webunaire.service';
import { CreateCategoryWebunaireDto } from './dto/create-category-webunaire.dto';
import { UpdateCategoryWebunaireDto } from './dto/update-category-webunaire.dto';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('catewebunaire')
export class CategoryWebunaireController {
  constructor(private readonly categoryWebinaireService: CategoryWebunaireService) {}


   @Roles('ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
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


  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryWebunaireDto: UpdateCategoryWebunaireDto) {
    return this.categoryWebinaireService.update(+id, updateCategoryWebunaireDto);
  }


  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryWebinaireService.remove(+id);
  }
}
