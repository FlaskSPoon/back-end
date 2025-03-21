import { Test, TestingModule } from '@nestjs/testing';
import { CategoryEvenementController } from './category-evenement.controller';
import { CategoryEvenementService } from './category-evenement.service';

describe('CategoryEvenementController', () => {
  let controller: CategoryEvenementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryEvenementController],
      providers: [CategoryEvenementService],
    }).compile();

    controller = module.get<CategoryEvenementController>(CategoryEvenementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
