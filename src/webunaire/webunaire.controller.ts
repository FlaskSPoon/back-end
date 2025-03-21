import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UpdateWebunaireDto } from './dto/update-webunaire.dto';
import { CreateWebinaireDto } from './dto/create-webunaire.dto';
import { WebunaireService } from './webunaire.service';

@Controller('webunaire')
export class WebunaireController {
  constructor(private readonly webinaireService: WebunaireService) {}

  @Post()
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebunaireDto: UpdateWebunaireDto) {
    return this.webinaireService.update(+id, updateWebunaireDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.webinaireService.remove(+id);
  }
}
