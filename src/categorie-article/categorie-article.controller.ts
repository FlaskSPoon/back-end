import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategorieArticleService } from './categorie-article.service';
import { CreateCategorieArticleDto } from './dto/create-categorie-article.dto';
import { UpdateCategorieArticleDto } from './dto/update-categorie-article.dto';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('catarticle')
export class CategorieArticleController {

  constructor(private readonly categorieArticleService: CategorieArticleService) {}


   @Roles('ROLE_ADMIN')
      @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  create(@Body() createCategorieArticleDto: CreateCategorieArticleDto) {
    return this.categorieArticleService.create(createCategorieArticleDto);
  }

  @Get()
  findAll() {
    return this.categorieArticleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categorieArticleService.findOne(+id);
  }



  @Roles('ROLE_ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategorieArticleDto: UpdateCategorieArticleDto) {
    return this.categorieArticleService.update(+id, updateCategorieArticleDto);
  }

  @Roles('ROLE_ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categorieArticleService.remove(+id);
  }
}
