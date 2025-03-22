import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { RessourceService } from './ressource.service';
import { CreateRessourceDto } from './dto/create-ressource.dto';
import { UpdateRessourceDto } from './dto/update-ressource.dto';
import { Ressource } from './entities/ressource.entity';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('ressource')
export class RessourceController {
  constructor(private readonly ressourceService: RessourceService) {}


   @Roles('ADMIN')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
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


  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateRessourceDto: UpdateRessourceDto,
  ): Promise<Ressource> {
    return this.ressourceService.update(id, updateRessourceDto);
  }


  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
 
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return this.ressourceService.remove(id);
  }
}
