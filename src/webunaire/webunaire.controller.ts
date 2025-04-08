import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UpdateWebunaireDto } from './dto/update-webunaire.dto';
import { CreateWebinaireDto } from './dto/create-webunaire.dto';
import { WebunaireService } from './webunaire.service';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('webunaire')
export class WebunaireController {
  constructor(private readonly webinaireService: WebunaireService) {}

  @Post()
  @Roles('ADMIN')
     @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() createWebinaireDto: CreateWebinaireDto) {
    return this.webinaireService.create(createWebinaireDto);
  }

  @Get()
  findAll() {
    return this.webinaireService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.webinaireService.findOne(+id);
  }

  @Roles('ADMIN')
   @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebunaireDto: UpdateWebunaireDto) {
    return this.webinaireService.update(+id, updateWebunaireDto);
  }


  @Roles('ADMIN')
   @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.webinaireService.remove(+id);
  }
}
