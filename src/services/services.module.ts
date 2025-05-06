import { Global, Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { CategoryService } from 'src/category-services/entities/category-service.entity';
import { CategoryServicesModule } from 'src/category-services/category-services.module';
import { CategoryServicesController } from 'src/category-services/category-services.controller';
import { CategoryServicesService } from 'src/category-services/category-services.service';
import { ServicesController } from './services.controller';


@Global()
@Module({
  imports:[TypeOrmModule.forFeature([Service]),CategoryServicesModule],
  controllers: [CategoryServicesController,ServicesController],
  providers: [ServicesService,CategoryServicesService],
  exports:[ServicesService,TypeOrmModule.forFeature([Service])]
})
export class ServicesModule {}
