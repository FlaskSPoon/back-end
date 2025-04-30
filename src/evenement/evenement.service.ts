import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEvenementDto } from './dto/create-evenement.dto';
import { UpdateEvenementDto } from './dto/update-evenement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Evenement } from './entities/evenement.entity';
import { Repository } from 'typeorm';
import { CategoryEvenement } from 'src/category-evenement/entities/category-evenement.entity';

@Injectable()
export class EvenementService {
  constructor(
    @InjectRepository(Evenement)
    private evenementRepository: Repository<Evenement>,
    @InjectRepository(CategoryEvenement)
    private categoryRepository: Repository<CategoryEvenement> 
    
  ) {}

  async create(createEvenementDto: CreateEvenementDto): Promise<Evenement> {
    const category = await this.categoryRepository.findOne({ 
      where: { id: createEvenementDto.categoryId },
      select: ['id'] 
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${createEvenementDto.categoryId} not found`);
    }

    const evenement = this.evenementRepository.create({
      ...createEvenementDto,
      category: category 
    });

    try {
      return await this.evenementRepository.save(evenement);
    } catch (error) {
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        throw new BadRequestException('Invalid category ID');
      }
      throw error;
    }
  }
  async findAll(): Promise<Evenement[]> {
    return await this.evenementRepository.find();
  }

  async findOne(id: number): Promise<Evenement> {
    const evenement = await this.evenementRepository.findOne({ where: { id } });
    if (!evenement) {
      throw new Error(`Événement avec l'ID ${id} non trouvé`);
    }
  
    return evenement;

  }


  
  async update(id: number, updateEvenementDto: UpdateEvenementDto):Promise<Evenement> {
    const evenement=await this.evenementRepository.findOne({where:{id}});
    if (!evenement) {
      throw new NotFoundException(`Evenement avec l'ID ${id} non trouvé`);
    }
    Object.assign(evenement,updateEvenementDto);
    return await this.evenementRepository.save(evenement);
  }

  async remove(id: number):Promise<{message:string}> {
    const evenement=await this.evenementRepository.findOne({where:{id}});
    if (!evenement) {
      throw new NotFoundException(`Evenement avec l'ID ${id} non trouvé`); 
    }
    await this.evenementRepository.remove(evenement);
    return {message:`Evenement avec l'ID ${id} supprimé avec succès`}
  }
}
