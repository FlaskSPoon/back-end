import { ApiProperty } from "@nestjs/swagger";
import { Article } from "src/article/entities/article.entity";
import { Role } from "src/role/entities/role.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class User implements User {
      @PrimaryGeneratedColumn()
    @ApiProperty()
    id:number;
    @ApiProperty()
    username: string;
    @ApiProperty()
    email:string;
    @ApiProperty()
    password: string;
   @ApiProperty()
  @Column()
  roleId: number;

  @ManyToOne(() => Role, (role) => role.users, { onDelete: "CASCADE" })
  role: Role;

  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];
}
