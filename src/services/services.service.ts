import { BadRequestException, Injectable, NotFoundException, Put, UseGuards } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { CategoryService } from 'src/category-services/entities/category-service.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';

@Injectable()
export class ServicesService {

    constructor(@InjectRepository(Service)
  private readonly serviceRepository: Repository<Service>,
  @InjectRepository(CategoryService)
  private readonly categoryServiceRepository: Repository<CategoryService>)
 {
  
    }
    async create(createServiceDto: CreateServiceDto) {
      // Vérification de la catégorie
      const category = await this.categoryServiceRepository.findOne({ 
       where:{name:createServiceDto.category}
      });
    
      if (!category) {
        throw new NotFoundException(`Category with name "${createServiceDto.category}" not found`);
      }
    
      // Création avec mapping explicite
      const service = new Service();
      service.name = createServiceDto.name;
      service.description = createServiceDto.description;
      service.price = Number(createServiceDto.price);
      service.image=createServiceDto.image
      service.createdAt = createServiceDto.createdAt ? new Date(createServiceDto.createdAt) : new Date();
      service.category = category;
    
      return this.serviceRepository.save(service);
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
    const service = await this.serviceRepository.findOne({
      where:{id},
      relations:['category']
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

  async updateFull(name: string, updateServiceDto: UpdateServiceDto): Promise<Service> {
    const service = await this.serviceRepository.findOne({ where: { name } });
  
    if (!service) {
      throw new NotFoundException(`Service avec le nom "${name}" non trouvé`);
    }
  
    // On met à jour les propriétés
    Object.assign(service, updateServiceDto);
  
    return await this.serviceRepository.save(service);
  }
 
  

}
