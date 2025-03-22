import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCategoryWebunaireDto } from './dto/update-category-webunaire.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryWebinaire } from './entities/category-webunaire.entity';
import { Repository } from 'typeorm';
import { CreateCategoryWebunaireDto } from './dto/create-category-webunaire.dto';

@Injectable()
export class CategoryWebunaireService {
  constructor(
    @InjectRepository(CategoryWebinaire)
    private categoryWebinaireRepository: Repository<CategoryWebinaire>,
  ) {}

  async create(createCategoryDto: CreateCategoryWebunaireDto): Promise<CategoryWebinaire> {
    const categoryWebinaire = this.categoryWebinaireRepository.create(createCategoryDto);
    return this.categoryWebinaireRepository.save(categoryWebinaire);
  }

  async findAll(): Promise<CategoryWebinaire[]> {
    return this.categoryWebinaireRepository.find();
  }

  async findOne(id: number): Promise<CategoryWebinaire> {
    const cateWeb = await this.categoryWebinaireRepository.findOne({ where: { id } });
    if(!cateWeb){
      throw new Error(`Category Webinaire avec l'ID ${id} non trouvé`);
    }
    return cateWeb;

  }

   async update(id: number, updateCategoryWebunaireDto: UpdateCategoryWebunaireDto) :Promise <CategoryWebinaire>{
    const cateWeb=await this.categoryWebinaireRepository.findOne({where:{id}});
  if (!cateWeb) {
    throw new NotFoundException(`Category Webunaire avec l'ID ${id} non trouvé`)
  }
    return await this.categoryWebinaireRepository.save(cateWeb);
  }

  async remove(id: number) :Promise<{message:string}>{
    const cateWeb=await this.categoryWebinaireRepository.findOne({where:{id}});
    if (!cateWeb) {
      throw new NotFoundException(`Category Webunaire avec l'ID ${id} non trouvé`);
    }
    await this.categoryWebinaireRepository.remove(cateWeb);
    return {message:`Category Webunaire avec l'ID ${id} supprimé avec succès`};
  }
}
