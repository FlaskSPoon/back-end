import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateWebunaireDto } from './dto/update-webunaire.dto';
import { CreateWebinaireDto } from './dto/create-webunaire.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Webinaire } from './entities/webunaire.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WebunaireService {
  constructor(
    @InjectRepository(Webinaire)
    private readonly webinaireRepository: Repository<Webinaire>,
  ) {}

  async create(createWebinaireDto: CreateWebinaireDto): Promise<Webinaire> {
    const webinaire = this.webinaireRepository.create(createWebinaireDto);
    return this.webinaireRepository.save(webinaire);
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
