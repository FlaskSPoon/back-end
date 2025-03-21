import { Module } from '@nestjs/common';
import { WebunaireService } from './webunaire.service';
import { WebunaireController } from './webunaire.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Webinaire } from './entities/webunaire.entity';
import { EvenementModule } from 'src/evenement/evenement.module';

@Module({
  imports:[TypeOrmModule.forFeature([Webinaire])],
  controllers: [WebunaireController],
  providers: [WebunaireService],
   exports: [WebunaireService],
})
export class WebunaireModule {}
