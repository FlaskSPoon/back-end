import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateWebunaireDto } from './dto/update-webunaire.dto';
import { CreateWebinaireDto } from './dto/create-webunaire.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Webinaire } from './entities/webunaire.entity';
import { Repository } from 'typeorm';
import { CategoryWebinaire } from 'src/category-webunaire/entities/category-webunaire.entity';

@Injectable()
export class WebunaireService {
  constructor(
    @InjectRepository(Webinaire)
    private readonly webinaireRepository: Repository<Webinaire>,
    @InjectRepository(CategoryWebinaire)
    private readonly categoryWebinaireRepository: Repository<CategoryWebinaire>,
  ) {}

  async create(createWebinaireDto: CreateWebinaireDto): Promise<Webinaire> {
    console.log('DTO reçu:', createWebinaireDto); // Debug
  
    const category = await this.categoryWebinaireRepository.findOneBy({ 
      id: createWebinaireDto.categoryId 
    });
  
    if (!category) {
      console.log(`Catégorie ${createWebinaireDto.categoryId} introuvable`);
      throw new NotFoundException(`Category ${createWebinaireDto.categoryId} not found`);
    }
  
    try {
      const webinaire = this.webinaireRepository.create({
        title: createWebinaireDto.title,
        description: createWebinaireDto.description,
        dateWebinaire: new Date(createWebinaireDto.dateWebinaire), // Conversion explicite
        category: { id: createWebinaireDto.categoryId }
      });
      
      return await this.webinaireRepository.save(webinaire);
    } catch (error) {
      console.error('Erreur SQL:', error);
      throw new BadRequestException('Validation failed');
    }
  }

  async findAll(): Promise<Webinaire[]> {
    return await this.webinaireRepository.find();
  }

  async findOne(id: number): Promise<Webinaire> {
    const webunaire= await this.webinaireRepository.findOne({ where: { id } });
    if(!webunaire){
      throw new Error(`Webunaire avec l'ID ${id} non trouvé`);
    }
    return webunaire;
  }

  
   async update(id: number, updateWebunaireDto: UpdateWebunaireDto):Promise<Webinaire> {
    const webinaire=await this.webinaireRepository.findOne({where:{id}});
    if (!webinaire) {
      throw new NotFoundException(`Webinaire avec l'ID ${id} non trouvé`)
    }
    return await this.webinaireRepository.save(webinaire);
  }

   async remove(id: number):Promise<{message:string}> {
    const webinaire=await this.webinaireRepository.findOne({where:{id}});
    if (!webinaire) {
      throw new NotFoundException(`Webinaire avec l'ID ${id} non trouvé`);
    }
    await this.webinaireRepository.remove(webinaire);
    return {message:`Webinaire avec l'ID ${id} supprimé avec succès`};
  }
}
