import { Injectable } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lead } from './entities/lead.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LeadService {

  constructor(@InjectRepository(Lead)
private readonly leadRepository: Repository<Lead> ){}



  async create(createLeadDto: CreateLeadDto) {
    const lead=await this.leadRepository.create(createLeadDto);

    return this.leadRepository.save(lead) ;
  }

  async findAll():Promise<Lead[]> {
    return await this.leadRepository.find();
  }



 async findOne(id: number) :Promise<Lead>{
  const lead=await this.leadRepository.findOne({where:{id}});
  if (!lead) {
    throw new Error(`Lead avec l'ID ${id} non trouvé`)
  }
    return lead;
  }

  async update(id: number, updateLeadDto: UpdateLeadDto): Promise<Lead> {
    const lead = await this.leadRepository.findOne({ where: { id } });
  
    if (!lead) {
      throw new Error(`Lead avec l'ID ${id} non trouvé`);
    }
  
    await this.leadRepository.update(id, updateLeadDto);
    
    const updatedLead = await this.leadRepository.findOne({ where: { id } });
  
    if (!updatedLead) {
      throw new Error(`Erreur lors de la mise à jour du Lead avec l'ID ${id}`);
    }
  
    return updatedLead;
  }
  

  async remove(id: number): Promise<string> {
    const lead = await this.leadRepository.findOne({ where: { id } });
  
    if (!lead) {
      throw new Error(`Lead avec l'ID ${id} non trouvé`);
    }
  
    await this.leadRepository.delete(id);
    return `Lead avec l'ID ${id} supprimé avec succès`;
  }
}
