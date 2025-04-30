import { ApiProperty } from "@nestjs/swagger";
import { ROLE } from "@prisma/client";
import { Article } from "src/article/entities/article.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
      @PrimaryGeneratedColumn()
    id:number;

    @ApiProperty()
    username: string;

    @ApiProperty()
    email:string;

    @ApiProperty()
    password: string;
    
    @ApiProperty()
    @Column()
    status: string;

   @ApiProperty()
  @Column()
  role: ROLE;



  @ApiProperty()
  @OneToMany(() => Article, (article) => article.user)
  articles?: Article[];
}
