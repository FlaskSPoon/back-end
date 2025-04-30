import { ApiProperty } from "@nestjs/swagger";
import { Article } from "src/article/entities/article.entity";

import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('CategoryArticle')
export class CategorieArticle {

@ApiProperty()
@PrimaryGeneratedColumn()
readonly id:number;

@ApiProperty()
@Column()
readonly name:string;

@ApiProperty()
@CreateDateColumn()
readonly createdAt:Date



@ApiProperty()
@UpdateDateColumn()
readonly updatedAt: Date;

@OneToMany(()=>Article,(article)=>article.category) 
 articles?:Article[]
}
