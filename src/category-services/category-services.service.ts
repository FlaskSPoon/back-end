import { Injectable } from '@nestjs/common';
import { CreateCategoryServiceDto } from './dto/create-category-service.dto';
import { UpdateCategoryServiceDto } from './dto/update-category-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from 'src/services/entities/service.entity';
import { Repository } from 'typeorm';
import { CategoryService } from './entities/category-service.entity';

@Injectable()
export class CategoryServicesService {

constructor(@InjectRepository(CategoryService)
private readonly categoryServices: Repository<CategoryService>
){}

  async create(createCategoryServiceDto: CreateCategoryServiceDto):Promise<CategoryService>{
    const categoryServices=this.categoryServices.create(createCategoryServiceDto)
    return await this.categoryServices.save(categoryServices);
  }
  
  async findAll(): Promise<CategoryService[]>{
    return await this.categoryServices.find();
  }

  async findOne(id: number):Promise<CategoryService> {
    const cateServi=await this.categoryServices.findOne({where:{id}});
    if(!cateServi){
      throw new Error(` Category service avec l'ID ${id} non trouvé`);
    }
    return cateServi;
  }

  update(id: number, updateCategoryServiceDto: UpdateCategoryServiceDto) {
    return `This action updates a #${id} categoryService`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoryService`;
  }
}
