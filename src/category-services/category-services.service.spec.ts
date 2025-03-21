import { Test, TestingModule } from '@nestjs/testing';
import { CategoryServicesService } from './category-services.service';

describe('CategoryServicesService', () => {
  let service: CategoryServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryServicesService],
    }).compile();

    service = module.get<CategoryServicesService>(CategoryServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
