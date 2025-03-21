import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ArticleStatut } from "./enuArticle";

@Entity('article')
export class Article  {
@ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiProperty()
  @Column({ nullable: true })
  readonly titre: string;

  @ApiProperty()
  @Column()
  readonly description: string;

  @ApiProperty()
  @Column()
  readonly datePublication: Date;
  
  @ApiProperty() 
  @Column()
  category: string;
  

 @Column({ type: 'enum', enum: ArticleStatut, default: ArticleStatut.BROUILLON })
  @IsOptional()
  @IsEnum(ArticleStatut)
  statut?: ArticleStatut;


  @ApiProperty()
  @ManyToOne(() => User, (user) => user.articles , { onDelete: 'CASCADE'}) 
  @JoinColumn({ name: 'user_id' }) 
  user: User;


}

   