import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Partenaire } from "src/partenaire/entities/partenaire.entity";
import { Ressource } from "src/ressource/entities/ressource.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('utilisateur')
export class Utilisateur {
    @PrimaryGeneratedColumn()
  id: number;


    @ApiProperty()
  @Column()
  @IsNotEmpty()
  @IsString()
  nom: string;


  @ApiProperty()
  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ManyToOne(() => Partenaire, (partenaire) => partenaire.utilisateurs, { nullable: true })
  @JoinColumn({ name: 'partenaireId' })
  partenaire: Partenaire;

  @OneToMany(() => Ressource, (ressource) => ressource.auteur)
  ressources: Ressource[];


  @ApiProperty()
  @Column({ nullable: true })
  partenaireId?: number;

    @ApiProperty()
      @CreateDateColumn()
      createdAt: Date;
    
  
      @ApiProperty()
      @UpdateDateColumn()
      updatedAt: Date;
}
