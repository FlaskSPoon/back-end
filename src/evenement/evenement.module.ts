import { Global, Module } from '@nestjs/common';
import { EvenementService } from './evenement.service';
import { EvenementController } from './evenement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evenement } from './entities/evenement.entity';
import { WebunaireModule } from 'src/webunaire/webunaire.module';
import { CategoryEvenement } from 'src/category-evenement/entities/category-evenement.entity';
import { CategoryEvenementModule } from 'src/category-evenement/category-evenement.module';


@Global()
@Module({
  imports:[ TypeOrmModule.forFeature([Evenement]),WebunaireModule],
  controllers: [EvenementController],
  providers: [EvenementService,CategoryEvenement],
    exports: [EvenementService, TypeOrmModule.forFeature([Evenement])],
})
export class EvenementModule {}
