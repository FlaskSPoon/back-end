import { Test, TestingModule } from '@nestjs/testing';
import { NewlettreSubscribeController } from './newlettre-subscribe.controller';
import { NewlettreSubscribeService } from './newlettre-subscribe.service';

describe('NewlettreSubscribeController', () => {
  let controller: NewlettreSubscribeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewlettreSubscribeController],
      providers: [NewlettreSubscribeService],
    }).compile();

    controller = module.get<NewlettreSubscribeController>(NewlettreSubscribeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
