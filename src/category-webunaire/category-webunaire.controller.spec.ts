import { Test, TestingModule } from '@nestjs/testing';
import { CategoryWebunaireController } from './category-webunaire.controller';
import { CategoryWebunaireService } from './category-webunaire.service';

describe('CategoryWebunaireController', () => {
  let controller: CategoryWebunaireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryWebunaireController],
      providers: [CategoryWebunaireService],
    }).compile();

    controller = module.get<CategoryWebunaireController>(CategoryWebunaireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
