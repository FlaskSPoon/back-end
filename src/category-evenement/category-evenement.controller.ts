import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryEvenementService } from './category-evenement.service';
import { CreateCategoryEvenementDto } from './dto/create-category-evenement.dto';
import { UpdateCategoryEvenementDto } from './dto/update-category-evenement.dto';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('catevenement')
export class CategoryEvenementController {
  constructor(private readonly categoryEvenementService: CategoryEvenementService) {}


    @Roles('ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryEvenementDto) {
    return this.categoryEvenementService.create(createCategoryDto);
  }



  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  findAll() {
    return this.categoryEvenementService.findAll();
  }


  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryEvenementService.findOne(+id);
  }


  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryEvenementDto: UpdateCategoryEvenementDto) {
    return this.categoryEvenementService.update(+id, updateCategoryEvenementDto);
  }


  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryEvenementService.remove(+id);
  }
}
