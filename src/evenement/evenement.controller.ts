import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException } from '@nestjs/common';
import { EvenementService } from './evenement.service';
import { CreateEvenementDto } from './dto/create-evenement.dto';
import { UpdateEvenementDto } from './dto/update-evenement.dto';
import { WebunaireService } from 'src/webunaire/webunaire.service';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { CategoryEvenementService } from 'src/category-evenement/category-evenement.service';

@Controller('evenements')
export class EvenementController {
   constructor(private readonly evenementService: EvenementService,
     private readonly webuService: WebunaireService,
     private readonly categoryService: CategoryEvenementService
   ) {}
 

   @Post()
   @Roles('ADMIN')
   @UseGuards(AuthGuard('jwt'), RolesGuard)
   async create(@Body() createEvenementDto: CreateEvenementDto) {
     // La vérification est maintenant dans le service
     return this.evenementService.create(createEvenementDto);
   }
 
   @Get()
   findAll() {
     return this.evenementService.findAll();
   }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evenementService.findOne(+id);
  }


  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEvenementDto: UpdateEvenementDto) {
    return this.evenementService.update(+id, updateEvenementDto);
  }


  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evenementService.remove(+id);
  }
}
