import { Global, Module } from '@nestjs/common';
import { CategorieArticleService } from './categorie-article.service';
import { CategorieArticleController } from './categorie-article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorieArticle } from './entities/categorie-article.entity';

@Global()
@Module({
  imports:[TypeOrmModule.forFeature([CategorieArticle])],
  controllers: [CategorieArticleController],
  providers: [CategorieArticleService],
})
export class CategorieArticleModule {}
