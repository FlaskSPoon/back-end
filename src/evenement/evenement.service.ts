import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEvenementDto } from './dto/create-evenement.dto';
import { UpdateEvenementDto } from './dto/update-evenement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Evenement } from './entities/evenement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EvenementService {
  constructor(
    @InjectRepository(Evenement)
    private evenementRepository: Repository<Evenement>,
  ) {}

  async create(createEvenementDto: CreateEvenementDto): Promise<Evenement> {
    const evenement = this.evenementRepository.create(createEvenementDto);
    return this.evenementRepository.save(evenement);
  }

  async findAll(): Promise<Evenement[]> {
    return this.evenementRepository.find();
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
