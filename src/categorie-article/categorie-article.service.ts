import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategorieArticleDto } from './dto/create-categorie-article.dto';
import { UpdateCategorieArticleDto } from './dto/update-categorie-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategorieArticle } from './entities/categorie-article.entity';
import { CategoryArticle } from '@prisma/client';
import { Repository } from 'typeorm';

@Injectable()
export class CategorieArticleService {

constructor(@InjectRepository(CategorieArticle)
private readonly categoryArticleservice: Repository<CategoryArticle>){


}

  async create(createCategorieArticleDto: CreateCategorieArticleDto):Promise<CategorieArticle> {
    const categoryArticleservice=this.categoryArticleservice.create(createCategorieArticleDto)
    return await this.categoryArticleservice.save(categoryArticleservice)
  }
 
  async findAll():Promise<CategorieArticle[]> {
    return await this.categoryArticleservice.find();
  }

 async findOne(id: number):Promise<CategorieArticle> {
  const catarticle=await this.categoryArticleservice.findOne({where:{id}});
  if (!catarticle) {
    throw new Error(` Category article avec l'ID ${id} non trouvé`)
  }
    return catarticle;
  }
  
  
  async update(id: number, updateCategorieArticleDto: UpdateCategorieArticleDto):Promise<CategorieArticle> {
    const catarticle=await this.categoryArticleservice.findOne({where:{id}});
    if (!catarticle) {
      throw new NotFoundException(`Category article avec l'ID ${id} non trouvé`)
    }
    return catarticle;
  }

 async remove(id: number):Promise<{message:string}> {
    const catarticle=await this.categoryArticleservice.findOne({where:{id}});
    if (!catarticle) {
      throw new NotFoundException(`Category article avec l'ID ${id} non trouvé`);
    }
    await this.categoryArticleservice.remove(catarticle)
    return {message:`Category article avec l'ID ${id} supprimé avec succès`};
  }
}
