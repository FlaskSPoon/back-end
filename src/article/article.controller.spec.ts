import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { FilterArticlesDto } from './dto/filter-articles.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { Article } from './entities/article.entity';
// import { User } from 'src/users/entities/user.entity';
import {User} from 'src/users/entities/user.entity'

describe('ArticleController', () => {
  let controller: ArticleController;
  let articleServices: ArticleService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [ArticleService],
    }).compile();

    articleServices = moduleRef.get(ArticleService);
    controller = moduleRef.get(ArticleController);
  });

  describe('findAll', () => {
    it('should return a paginated list of articles', async () => {
      const result = {
        data: [
          Object.assign(new Article(), {
            id: 1,
            titre: 'Test Article',
            description: 'Description de l\'article',
            datePublication: new Date(),
            category: 'Tech',
            user: Object.assign(new User(), {
              id: 1,
              username: 'admin_user',
              email: 'admin@example.com',
              password: 'hashed_password',
              role: 'admin',
              articles: [],
              createdAt: new Date(),
              updatedAt: new Date(),
            }),
          }),
        ],
        totalCount: 1,
        totalPages: 1,
        currentPage: 1,
      };
      
      
      const paginationQuery: PaginationQueryDto = { page: 1, limit: 10, e: "valeur_par_defaut" };

      const filterQuery: FilterArticlesDto = {};

      expect(await controller.findAll(paginationQuery, filterQuery)).toEqual(result);
    });
  });
});
