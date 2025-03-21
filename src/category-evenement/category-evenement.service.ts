import { Injectable } from '@nestjs/common';
import { CreateCategoryEvenementDto } from './dto/create-category-evenement.dto';
import { UpdateCategoryEvenementDto } from './dto/update-category-evenement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEvenement } from './entities/category-evenement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryEvenementService {
  constructor(
    @InjectRepository(CategoryEvenement)
    private categoryEvenementRepository: Repository<CategoryEvenement>,
  ) {}

  async create(createCategoryDto: CreateCategoryEvenementDto): Promise<CategoryEvenement> {
    const categoryEvenement = this.categoryEvenementRepository.create(createCategoryDto);
    return this.categoryEvenementRepository.save(categoryEvenement);
  }

  async findAll(): Promise<CategoryEvenement[]> {
    return await this.categoryEvenementRepository.find();
  }
  
  async findOne(id: number): Promise<CategoryEvenement> {
    const cateEv=await this.categoryEvenementRepository.findOne({where:{id}});
    if(!cateEv){
      throw new Error(` Category Événement avec l'ID ${id} non trouvé`);  
    }
    return cateEv;
  }
  update(id: number, updateCategoryEvenementDto: UpdateCategoryEvenementDto) {
    return `This action updates a #${id} categoryEvenement`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoryEvenement`;
  }
}
