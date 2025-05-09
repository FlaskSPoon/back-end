import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from '@prisma/client';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ConfigService } from '@nestjs/config';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService,
    private readonly configService: ConfigService)
   {}
   @Post()
   @UseInterceptors(
     FileInterceptor('image', {
       storage: diskStorage({
         destination: join(process.cwd(), 'uploads', 'services'),
         filename: (req, file, callback) => {
           const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
           const ext = extname(file.originalname);
           const filename = `${uniqueSuffix}${ext}`;
           callback(null, filename);
         },
       }),
     }),
   )
   async create(
     @UploadedFile() file: Express.Multer.File,
     @Body() body: any, 
   ) {
     const createServiceDto: CreateServiceDto = {
       ...body,
       price: Number(body.price),
       image: file?.filename ?? null,
     };
 
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

  
@Put(':id')
@Roles('ROLE_ADMIN')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@UseInterceptors(
  FileInterceptor('image', {
    storage: diskStorage({
      destination: join(process.cwd(), 'uploads', 'services'), // Dossier de destination
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${uniqueSuffix}${ext}`); // Nom unique
      },
    }),
  }),
)
async update(
  @Param('id') id: string,
  @Body() updateServiceDto: UpdateServiceDto,
  @UploadedFile() image?: Express.Multer.File,
) {
  return await this.servicesService.update(+id, updateServiceDto, image);
}


  @Delete(':id')
  @Roles('ROLE_ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return await this.servicesService.remove(+id);
  }

  // @Put('update-by-name/:name')
  // @Roles('ROLE_ADMIN')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // async updateFull(
  //   @Param('name') name: string,
  //   @Body() updateServiceDto: UpdateServiceDto,
  // ) {
  //   return await this.servicesService.updateFull(name, updateServiceDto);
  // }
}