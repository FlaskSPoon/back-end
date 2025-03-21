import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";
import { Utilisateur } from "src/utilisateur/entities/utilisateur.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('partenaire')
export class Partenaire {
    @PrimaryGeneratedColumn()
    id: number;
  
      @ApiProperty()
    @Column()
    @IsNotEmpty()
    @IsString()
    nom: string;
  

    @ApiProperty()
    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    description?: string;
  

    @ApiProperty()
    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    logo?: string;
  

    @ApiProperty()
    @Column({ nullable: true })
    @IsOptional()
    @IsUrl()
    siteWeb?: string;
  
    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;
  

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;
  
    @ApiProperty()
    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    contact?: string;
  
    @OneToMany(() => Utilisateur, (utilisateur) => utilisateur.partenaire)
    utilisateurs: Utilisateur[];
}
