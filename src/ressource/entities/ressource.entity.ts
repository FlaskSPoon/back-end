import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('ressource')
export class Ressource {

    @PrimaryGeneratedColumn()
    id: number;
  

      @ApiProperty()
    @Column()
    @IsNotEmpty()
    @IsString()
    titre: string;
  

    @ApiProperty()
    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    description?: string;
  

    @ApiProperty()
    @Column()
    @IsNotEmpty()
    @IsString()
    contenu: string;
  

    @ApiProperty()
    @Column()
    @IsNotEmpty()
    @IsString()
    type: string;
  

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;
  

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;
  

    @ApiProperty()
    @Column({ nullable: true })
    auteurId?: number;
  
    @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.ressources, { nullable: true })
    @JoinColumn({ name: 'auteurId' })
    auteur?: Utilisateur;
}
