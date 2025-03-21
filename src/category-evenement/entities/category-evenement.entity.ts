import { ApiProperty } from '@nestjs/swagger';
import { Evenement } from 'src/evenement/entities/evenement.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity('categoryevenement')
export class CategoryEvenement {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description?: string;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty()
  @OneToMany(() => Evenement, (evenement) => evenement.category)
  Evenements: Evenement[];
}
