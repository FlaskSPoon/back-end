import { Test, TestingModule } from '@nestjs/testing';
import { EvenementController } from './evenement.controller';
import { EvenementService } from './evenement.service';

describe('EvenementController', () => {
  let controller: EvenementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvenementController],
      providers: [EvenementService],
    }).compile();

    controller = module.get<EvenementController>(EvenementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
