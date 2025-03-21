import { Injectable } from '@nestjs/common';
import { CreateRessourceDto } from './dto/create-ressource.dto';
import { UpdateRessourceDto } from './dto/update-ressource.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ressource } from './entities/ressource.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RessourceService {

  constructor(@InjectRepository(Ressource)
private readonly ressourceRepository: Repository<Ressource>){}




 async create(createRessourceDto: CreateRessourceDto) {
    const res= await this.ressourceRepository.create(createRessourceDto);

    return this.ressourceRepository.save(res);
  }

 async findAll():Promise<Ressource[]> {
    return await this.ressourceRepository.find();
  }


 async findOne(id: number):Promise<Ressource> {
  const res=await this.ressourceRepository.findOne({where:{id}});
  if (!res) {
    throw new Error(`Ressource avec l'ID ${id} non trouvé`)
  }
    return res;
  }

  async update(id: number, updateRessourceDto: UpdateRessourceDto): Promise<Ressource> {
    
    const res = await this.ressourceRepository.findOne({ where: { id } });
    if (!res) {
      throw new Error(`Ressource avec l'ID ${id} non trouvé`); 
    }

    
    Object.assign(res, updateRessourceDto); 
    return this.ressourceRepository.save(res); 
  }


  async remove(id: number): Promise<{ message: string }> {
    const res = await this.ressourceRepository.findOne({ where: { id } });
    if (!res) {
      throw new Error(`Ressource avec l'ID ${id} non trouvé`); 
    }

    await this.ressourceRepository.remove(res); 
    return { message: `Ressource avec l'ID ${id} a été supprimée` }; 
  }
}
