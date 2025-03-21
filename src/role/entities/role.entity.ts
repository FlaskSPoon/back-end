import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Role {
    @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

@ApiProperty()
  @Column({ unique: true })
  name: string;
  
@ApiProperty()
  @OneToMany(() => User, (user) => user.role)
  users: User[];
  
}
