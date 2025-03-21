import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RessourceService } from './ressource.service';
import { CreateRessourceDto } from './dto/create-ressource.dto';
import { UpdateRessourceDto } from './dto/update-ressource.dto';
import { Ressource } from './entities/ressource.entity';

@Controller('ressource')
export class RessourceController {
  constructor(private readonly ressourceService: RessourceService) {}

  @Post()
  create(@Body() createRessourceDto: CreateRessourceDto) {
    return this.ressourceService.create(createRessourceDto);
  }

  @Get()
  findAll() {
    return this.ressourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ressourceService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRessourceDto: UpdateRessourceDto,
  ): Promise<Ressource> {
    return this.ressourceService.update(id, updateRessourceDto);
  }

 
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return this.ressourceService.remove(id);
  }
}
