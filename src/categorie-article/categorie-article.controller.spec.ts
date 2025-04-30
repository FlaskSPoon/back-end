import { Test, TestingModule } from '@nestjs/testing';
import { CategorieArticleController } from './categorie-article.controller';
import { CategorieArticleService } from './categorie-article.service';

describe('CategorieArticleController', () => {
  let controller: CategorieArticleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategorieArticleController],
      providers: [CategorieArticleService],
    }).compile();

    controller = module.get<CategorieArticleController>(CategorieArticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
