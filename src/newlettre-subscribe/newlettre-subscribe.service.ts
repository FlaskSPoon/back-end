import { Injectable } from '@nestjs/common';
import { CreateNewlettreSubscribeDto } from './dto/create-newlettre-subscribe.dto';
import { UpdateNewlettreSubscribeDto } from './dto/update-newlettre-subscribe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NewlettreSubscribe } from './entities/newlettre-subscribe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewlettreSubscribeService {

  constructor(@InjectRepository(NewlettreSubscribe)
private readonly  newlettreRepository:Repository<NewlettreSubscribe> ){}


 async create(createNewlettreSubscribeDto: CreateNewlettreSubscribeDto) {
    const newle= await this.newlettreRepository.create(createNewlettreSubscribeDto);

    return this.newlettreRepository.save(newle) ;
  }

  async findAll():Promise<NewlettreSubscribe[]> {
    return await this.newlettreRepository.find();
  }


 async findOne(id: number) :Promise<NewlettreSubscribe>{
    const newl=await this.newlettreRepository.findOne({where:{id}});
    if (!newl) {
      throw new Error(`NewLettre avec l'ID ${id} non trouvé`)
    }
    return newl;
  }

  async update(id: number, updateNewlettreSubscribeDto: UpdateNewlettreSubscribeDto): Promise<NewlettreSubscribe> {
    const newl = await this.newlettreRepository.findOne({ where: { id } });

    if (!newl) {
      throw new Error(`NewLettre avec l'ID ${id} non trouvée`);
    }

    await this.newlettreRepository.update(id, updateNewlettreSubscribeDto);

    const updatedNewlettre = await this.newlettreRepository.findOne({ where: { id } });

    if (!updatedNewlettre) {
      throw new Error(`Erreur lors de la mise à jour de la NewLettre avec l'ID ${id}`);
    }

    return updatedNewlettre;
  }

  async remove(id: number): Promise<string> {
    const newl = await this.newlettreRepository.findOne({ where: { id } });

    if (!newl) {
      throw new Error(`NewLettre avec l'ID ${id} non trouvée`);
    }

    await this.newlettreRepository.delete(id);
    
    return `NewLettre avec l'ID ${id} supprimée avec succès.`;
  }
}
