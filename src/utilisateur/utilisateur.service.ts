import { Injectable } from '@nestjs/common';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from './entities/utilisateur.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UtilisateurService {

  constructor(@InjectRepository(Utilisateur)
private readonly utilisateurRepository: Repository<Utilisateur>){}

 async create(createUtilisateurDto: CreateUtilisateurDto) {

  const util= await this.utilisateurRepository.create(createUtilisateurDto);

    return this.utilisateurRepository.save(util);
  }

  async findAll():Promise<Utilisateur[]> {
    return await this.utilisateurRepository.find() ;
  }



  async findOne(id: number):Promise<Utilisateur> {
    const  utilis=await this.utilisateurRepository.findOne({where:{id}});
    if (!utilis) {
      throw new Error(`Utilisateur avec l'ID ${id} non trouvé`)
    }
    return  utilis;
  }

  update(id: number, updateUtilisateurDto: UpdateUtilisateurDto) {
    return `This action updates a #${id} utilisateur`;
  }

  remove(id: number) {
    return `This action removes a #${id} utilisateur`;
  }
}
