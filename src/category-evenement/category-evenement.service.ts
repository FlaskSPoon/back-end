import { Injectable, NotFoundException } from '@nestjs/common';
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

 
  async update(id: number, updateCategoryEvenementDto: UpdateCategoryEvenementDto): Promise<CategoryEvenement> {
    const cateEv = await this.categoryEvenementRepository.findOne({ where: { id } });
    
  
    if (!cateEv) {
      throw new NotFoundException(`Category Evenement avec l'ID ${id} non trouvé`);
    }
  
    Object.assign(cateEv, updateCategoryEvenementDto);
  
    return await this.categoryEvenementRepository.save(cateEv);
  }
  

  async remove(id: number):Promise<{message:string}> {
    const cateEv=await this.categoryEvenementRepository.findOne({where:{id}});
    if (!cateEv) {
      throw new NotFoundException(`Category Evenement avec l'ID ${id} non trouvé`);
    }
      await this.categoryEvenementRepository.remove(cateEv);
      return {message:`Category Evenement avec l'ID ${id} supprimé avec succès`};
  }
}
