import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from '@prisma/client';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  
  // @Put(':id')
  // async update(
  //   @Param('id') id: number,
  //   @Body() updateServiceDto: UpdateServiceDto,
  // ): Promise<Service> {
  //   return this.servicesService.update(id, updateServiceDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return this.servicesService.remove(id);
  }
}
