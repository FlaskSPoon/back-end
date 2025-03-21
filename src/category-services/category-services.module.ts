import { Module } from '@nestjs/common';
import { CategoryServicesService } from './category-services.service';
import { CategoryServicesController } from './category-services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './entities/category-service.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CategoryService])],
  controllers: [CategoryServicesController],
  providers: [CategoryServicesService],
  exports:[CategoryServicesModule]
})
export class CategoryServicesModule {}
