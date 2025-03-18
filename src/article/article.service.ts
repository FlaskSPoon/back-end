import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const { userId, titre, description, datePublication, statut } = createArticleDto;

    // Recherche de l'utilisateur par ID
    const user = await this.userRepository.findOne({
      where: { id: userId },
    
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    // Création de l'article et association avec l'utilisateur
    const article = this.articleRepository.create({
      titre,
      description,
      datePublication,
      statut,
      user, // L'utilisateur associé à l'article
    });

    return this.articleRepository.save(article);
  }

  findAll() {
    return `This action returns all article`;
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
