import { Test, TestingModule } from '@nestjs/testing';
import { CategoryEvenementService } from './category-evenement.service';

describe('CategoryEvenementService', () => {
  let service: CategoryEvenementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryEvenementService],
    }).compile();

    service = module.get<CategoryEvenementService>(CategoryEvenementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
