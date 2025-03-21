import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { CategoryService } from 'src/category-services/entities/category-service.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Service])],
  controllers: [ServicesController],
  providers: [ServicesService,CategoryService],
  exports:[ServicesModule]
})
export class ServicesModule {}
