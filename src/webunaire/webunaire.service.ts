import { Injectable } from '@nestjs/common';
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

  
  update(id: number, updateWebunaireDto: UpdateWebunaireDto) {
    return `This action updates a #${id} webunaire`;
  }

  remove(id: number) {
    return `This action removes a #${id} webunaire`;
  }
}
