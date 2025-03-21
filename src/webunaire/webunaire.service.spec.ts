import { Test, TestingModule } from '@nestjs/testing';
import { WebunaireService } from './webunaire.service';

describe('WebunaireService', () => {
  let service: WebunaireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebunaireService],
    }).compile();

    service = module.get<WebunaireService>(WebunaireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
