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
    const { userId, titre, description, datePublication,categoryId, statut } = createArticleDto;

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
      statut:ArticleStatut.PUBLIÉ,
      user,
      category:{id:categoryId} 
      
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


 async findOne(id: number):Promise<Article> {
  const article= await this.articleRepository.findOne({where:{id}});
  if (!article) {
    throw new Error(`Article avec l'ID ${id} non trouvé`);
  }
    return article;
  }

   async update(id: number, updateArticleDto: UpdateArticleDto): Promise<Article>  {
    const article=await this.articleRepository.findOne({where:{id}});
    if (!article) {
      throw new NotFoundException(`Article avec l'ID ${id} non trouvé`);
    }
    Object.assign(article,updateArticleDto);
    return  await this.articleRepository.save(article);
  }

  
  async remove(id: number): Promise<{message:string}>  {
    const article=await this.articleRepository.findOne({where:{id}});
    if (!article) {
      throw new NotFoundException(`Article avec l'ID ${id} non trouvé`);
    }
    await this.articleRepository.remove(article);
    return {message:`Article avec l'ID ${id} supprimé avec succès`};
  }
}
