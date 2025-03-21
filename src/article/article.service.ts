import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { PaginationQueryDto } from './dto/pagination-query.dto'; 
import { FilterArticlesDto } from './dto/filter-articles.dto';
import { ArticleStatut } from './entities/enuArticle';


@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const { userId, titre, description, datePublication,category, statut } = createArticleDto;

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

   
   const article = this.articleRepository.create({
      titre,
      description,
      datePublication,
      category,
      statut:ArticleStatut.PUBLIÉ,
      user, 
    });

    return  this.articleRepository.save(article);
  }

  async findAll(paginationQuery: PaginationQueryDto, filterQuery: FilterArticlesDto) {
    const { page, limit } = paginationQuery;
    const { titre, statut, category } = filterQuery;
  
    // Vérification et conversion explicite
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
  
    if (isNaN(pageNumber) || isNaN(limitNumber)) {
      throw new BadRequestException('Page and limit must be valid numbers');
    }
  
    const queryBuilder = this.articleRepository.createQueryBuilder('article');
  
    if (titre) {
      queryBuilder.andWhere('article.titre LIKE :titre', { titre: `%${titre}%` });
    }
  
    if (statut) {
      queryBuilder.andWhere('article.statut = :statut', { statut });
    }
  
    if (category) {
      queryBuilder.andWhere('article.category = :category', { category });
    }
  
   
    queryBuilder.skip((pageNumber - 1) * limitNumber).take(limitNumber);
  
    const [articles, totalCount] = await queryBuilder.getManyAndCount();
  
    return {
      data: articles,
      totalCount,
      totalPages: Math.ceil(totalCount / limitNumber),
      currentPage: pageNumber,
    };
  }
  

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
