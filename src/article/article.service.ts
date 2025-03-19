import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { PaginationQueryDto } from './dto/pagination-query.dto'; 
import { FilterArticlesDto } from './dto/filter-articles.dto';


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
      statut,
      user, 
    });

    return this.articleRepository.save(article);
  }

 
  async findAll(paginationQuery: PaginationQueryDto, filterQuery: FilterArticlesDto) {
    const { page, limit } = paginationQuery;
    const { titre, statut, category } = filterQuery;

    const queryBuilder = this.articleRepository.createQueryBuilder('article');

    
    if (titre) {
      queryBuilder.andWhere('article.titre LIKE :titre', { titre: `%${titre}%` });
    }

    if (statut) {
      queryBuilder.andWhere('article.statut = :statut', { statut });
    }

    if (category) {
      queryBuilder.andWhere('article.categorie = :categorie', { category });
    }

    
    queryBuilder.skip((page - 1) * limit).take(limit);

    const [articles, totalCount] = await queryBuilder.getManyAndCount();

    return {
      data: articles,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
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
