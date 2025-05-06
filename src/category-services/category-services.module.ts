import { Global, Module } from '@nestjs/common';
import { CategoryServicesService } from './category-services.service';
import { CategoryServicesController } from './category-services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './entities/category-service.entity';
import { ServicesService } from 'src/services/services.service';
import { ServicesModule } from 'src/services/services.module';



@Global()
@Module({
  imports:[TypeOrmModule.forFeature([CategoryService])],
  controllers: [CategoryServicesController],
  providers: [ServicesService,CategoryServicesService],
  exports:[TypeOrmModule.forFeature([CategoryService])]
})
export class CategoryServicesModule {}
