import { Module } from '@nestjs/common';
import { PartenaireService } from './partenaire.service';
import { PartenaireController } from './partenaire.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partenaire } from './entities/partenaire.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Partenaire])],
  controllers: [PartenaireController],
  providers: [PartenaireService],
})
export class PartenaireModule {}
