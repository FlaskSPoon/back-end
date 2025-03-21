import { Test, TestingModule } from '@nestjs/testing';
import { CategoryServicesController } from './category-services.controller';
import { CategoryServicesService } from './category-services.service';

describe('CategoryServicesController', () => {
  let controller: CategoryServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryServicesController],
      providers: [CategoryServicesService],
    }).compile();

    controller = module.get<CategoryServicesController>(CategoryServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
