import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Article  {
@ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiProperty()
  @Column()
  readonly titre: string;

  @ApiProperty()
  @Column()
  readonly description: string;

  @ApiProperty()
  @Column()
  readonly datePublication: Date; 

  @ApiProperty()
  @Column()
  readonly statut: boolean;

  @ManyToOne(() => User, (user) => user.articles , { onDelete: 'CASCADE'}) 
  @JoinColumn({ name: 'user_id' }) 
  user: User;


}

   