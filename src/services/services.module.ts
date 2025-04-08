import { Global, Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { CategoryService } from 'src/category-services/entities/category-service.entity';
import { CategoryServicesModule } from 'src/category-services/category-services.module';


@Global()
@Module({
  imports:[TypeOrmModule.forFeature([Service])],
  controllers: [ServicesController],
  providers: [ServicesService,CategoryService],
  exports:[ServicesService,TypeOrmModule.forFeature([Service])]
})
export class ServicesModule {}
