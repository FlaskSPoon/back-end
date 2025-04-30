import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ArticleStatut } from "./enuArticle";
import { CategoryArticle } from "@prisma/client";
import { CategorieArticle } from "src/categorie-article/entities/categorie-article.entity";

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
  @ManyToOne(() => CategorieArticle, (category) => category.articles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  readonly category: CategoryArticle;

 @Column({ type: 'enum', enum: ArticleStatut, default: ArticleStatut.BROUILLON })
  @IsOptional()
  @IsEnum(ArticleStatut)
  readonly statut?: ArticleStatut;
  

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.articles , { onDelete: 'CASCADE'}) 
  @JoinColumn({ name: 'user_id' }) 
  readonly user: User;


}

   