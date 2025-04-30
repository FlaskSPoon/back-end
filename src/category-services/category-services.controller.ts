import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoryServicesService } from './category-services.service';
import { CreateCategoryServiceDto } from './dto/create-category-service.dto';
import { UpdateCategoryServiceDto } from './dto/update-category-service.dto';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('cateservice')
export class CategoryServicesController {
  constructor(private readonly categoryServicesService: CategoryServicesService) {}


   @Roles('ROLE_ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  create(@Body() createCategoryServiceDto: CreateCategoryServiceDto) {
    return this.categoryServicesService.create(createCategoryServiceDto);
  }

  @Get()
  findAll() {
    return this.categoryServicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryServicesService.findOne(+id);
  }


  @Roles('ROLE_ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryServiceDto: UpdateCategoryServiceDto) {
    return this.categoryServicesService.update(+id, updateCategoryServiceDto);
  }

  @Roles('ROLE_ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryServicesService.remove(+id);
  }
}
