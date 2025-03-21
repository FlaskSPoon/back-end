import { Test, TestingModule } from '@nestjs/testing';
import { WebunaireController } from './webunaire.controller';
import { WebunaireService } from './webunaire.service';

describe('WebunaireController', () => {
  let controller: WebunaireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebunaireController],
      providers: [WebunaireService],
    }).compile();

    controller = module.get<WebunaireController>(WebunaireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
