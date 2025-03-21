import { Test, TestingModule } from '@nestjs/testing';
import { NewlettreSubscribeService } from './newlettre-subscribe.service';

describe('NewlettreSubscribeService', () => {
  let service: NewlettreSubscribeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewlettreSubscribeService],
    }).compile();

    service = module.get<NewlettreSubscribeService>(NewlettreSubscribeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
