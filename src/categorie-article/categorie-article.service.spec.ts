import { Test, TestingModule } from '@nestjs/testing';
import { CategorieArticleService } from './categorie-article.service';

describe('CategorieArticleService', () => {
  let service: CategorieArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategorieArticleService],
    }).compile();

    service = module.get<CategorieArticleService>(CategorieArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
