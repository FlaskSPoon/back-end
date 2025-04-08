import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { NewlettreSubscribeService } from './newlettre-subscribe.service';
import { CreateNewlettreSubscribeDto } from './dto/create-newlettre-subscribe.dto';
import { UpdateNewlettreSubscribeDto } from './dto/update-newlettre-subscribe.dto';
import { ApiTags } from '@nestjs/swagger';
import { NewlettreSubscribe } from './entities/newlettre-subscribe.entity';

@Controller('newlettre')
@ApiTags('newlettre')
export class NewlettreSubscribeController {
  constructor(private readonly newlettreSubscribeService: NewlettreSubscribeService) {}

  @Post()
  create(@Body() createNewlettreSubscribeDto: CreateNewlettreSubscribeDto) {
    return this.newlettreSubscribeService.create(createNewlettreSubscribeDto);
  }

  @Get()
  findAll() {
    return this.newlettreSubscribeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newlettreSubscribeService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number, 
    @Body() updateNewlettreSubscribeDto: UpdateNewlettreSubscribeDto
  ): Promise<NewlettreSubscribe> {
    try {
      return await this.newlettreSubscribeService.update(id, updateNewlettreSubscribeDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    try {
      const result = await this.newlettreSubscribeService.remove(id);
      return { message: result };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
