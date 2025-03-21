import { Injectable } from '@nestjs/common';
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

  update(id: number, updateCategoryWebunaireDto: UpdateCategoryWebunaireDto) {
    return `This action updates a #${id} categoryWebunaire`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoryWebunaire`;
  }
}
