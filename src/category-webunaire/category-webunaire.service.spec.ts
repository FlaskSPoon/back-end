import { Test, TestingModule } from '@nestjs/testing';
import { CategoryWebunaireService } from './category-webunaire.service';

describe('CategoryWebunaireService', () => {
  let service: CategoryWebunaireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryWebunaireService],
    }).compile();

    service = module.get<CategoryWebunaireService>(CategoryWebunaireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
