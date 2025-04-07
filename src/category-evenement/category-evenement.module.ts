import { Global, Module } from '@nestjs/common';
import { CategoryEvenementService } from './category-evenement.service';
import { CategoryEvenementController } from './category-evenement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEvenement } from './entities/category-evenement.entity';
@Global()
@Module({
  imports:[TypeOrmModule.forFeature([CategoryEvenement])],
  controllers: [CategoryEvenementController],
  providers: [CategoryEvenementService],
   exports: [CategoryEvenementService, TypeOrmModule.forFeature([CategoryEvenement])],
})
export class CategoryEvenementModule {}
