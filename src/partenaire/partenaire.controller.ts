import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { PartenaireService } from './partenaire.service';
import { CreatePartenaireDto } from './dto/create-partenaire.dto';
import { UpdatePartenaireDto } from './dto/update-partenaire.dto';
import { ApiTags } from '@nestjs/swagger';
import { Partenaire } from './entities/partenaire.entity';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('partenaire')
@ApiTags('partenaire')
export class PartenaireController {
  constructor(private readonly partenaireService: PartenaireService) {}

  @Post()
    @Roles('ADMIN')
     @UseGuards(AuthGuard('jwt'), RolesGuard)
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

  @Patch(':id')
  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async update(
    @Param('id') id: number,
    @Body() updatePartenaireDto: UpdatePartenaireDto,
  ): Promise<Partenaire> {
    return this.partenaireService.update(id, updatePartenaireDto);
  }



  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return this.partenaireService.remove(id);
  }
}
