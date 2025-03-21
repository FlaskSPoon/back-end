import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PartenaireService } from './partenaire.service';
import { CreatePartenaireDto } from './dto/create-partenaire.dto';
import { UpdatePartenaireDto } from './dto/update-partenaire.dto';
import { ApiTags } from '@nestjs/swagger';
import { Partenaire } from './entities/partenaire.entity';

@Controller('partenaire')
@ApiTags('partenaire')
export class PartenaireController {
  constructor(private readonly partenaireService: PartenaireService) {}

  @Post()
  create(@Body() createPartenaireDto: CreatePartenaireDto) {
    return this.partenaireService.create(createPartenaireDto);
  }

  @Get()
  findAll() {
    return this.partenaireService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partenaireService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePartenaireDto: UpdatePartenaireDto,
  ): Promise<Partenaire> {
    return this.partenaireService.update(id, updatePartenaireDto);
  }


  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return this.partenaireService.remove(id);
  }
}
