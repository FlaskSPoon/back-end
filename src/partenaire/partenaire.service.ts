import { Body, Delete, HttpException, HttpStatus, Injectable, Param, Patch } from '@nestjs/common';
import { CreatePartenaireDto } from './dto/create-partenaire.dto';
import { UpdatePartenaireDto } from './dto/update-partenaire.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Partenaire } from './entities/partenaire.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PartenaireService {
  constructor(@InjectRepository(Partenaire)
private readonly partenaireRepository: Repository<Partenaire>){


 
  }
 async  create(createPartenaireDto: CreatePartenaireDto) {
  const partenaires= await this.partenaireRepository.create(createPartenaireDto);
    return this.partenaireRepository.save(partenaires);
  }


 async findAll():Promise<Partenaire[]> {
    return await this.partenaireRepository.find();
  }

  

 async findOne(id: number):Promise<Partenaire> {
  const partenaires=await this.partenaireRepository.findOne({where:{id}});
  if (!partenaires) {
    throw new Error(`Partenaires avec l'ID ${id} non trouvé`)
  }
    return partenaires;
  }

  async update(id: number, updatePartenaireDto: UpdatePartenaireDto): Promise<Partenaire> {
    const partenaire = await this.findOne(id);  
    if (!partenaire) {
      throw new Error(`Partenaire avec l'ID ${id} non trouvé`);
    }
  
    
    await this.partenaireRepository.update(id, updatePartenaireDto);
  
    
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const partenaire = await this.findOne(id); 
    if (!partenaire) {
      throw new Error(`Partenaire avec l'ID ${id} non trouvé`);
    }
  
    await this.partenaireRepository.remove(partenaire); 
    return { message: `Partenaire avec l'ID ${id} supprimé avec succès` };
  }
}
