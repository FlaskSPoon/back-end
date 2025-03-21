import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { CategoryService } from 'src/category-services/entities/category-service.entity';

@Injectable()
export class ServicesService {

    constructor(@InjectRepository(Service)
  private readonly serviceRepository: Repository<Service>)
 {
  
    }
  async create(createServiceDto: CreateServiceDto) {
const services=await this.serviceRepository.create(createServiceDto);

    return this.serviceRepository.save(services);
  }

  

  async findAll():Promise<Service[]> {
    return await this.serviceRepository.find();
  }

  async findOne(id: number):Promise<Service> {
    const service=await this.serviceRepository.findOne({where:{id}});
    if(!service){
      throw new Error(`Service avec l'ID ${id} non trouvé`)
    }
    return service;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto): Promise<Service> {
    const service = await this.serviceRepository.preload({
      id,
      ...updateServiceDto,
    });

    if (!service) {
      throw new NotFoundException(`Service avec l'ID ${id} non trouvé`);
    }

    return await this.serviceRepository.save(service);
  }

  async remove(id: number): Promise<{ message: string }> {
    const service = await this.serviceRepository.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException(`Service avec l'ID ${id} non trouvé`);
    }

    await this.serviceRepository.remove(service);
    return { message: `Le service avec l'ID ${id} a été supprimé avec succès` };
  }
}
