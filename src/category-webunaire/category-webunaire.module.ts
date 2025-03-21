import { Module } from '@nestjs/common';
import { CategoryWebunaireService } from './category-webunaire.service';
import { CategoryWebunaireController } from './category-webunaire.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryWebinaire } from './entities/category-webunaire.entity';

@Module({
  imports :[TypeOrmModule.forFeature([CategoryWebinaire])],
  controllers: [CategoryWebunaireController],
  providers: [CategoryWebunaireService],
  exports: [CategoryWebunaireService, TypeOrmModule.forFeature([CategoryWebinaire])],
})
export class CategoryWebunaireModule {}
