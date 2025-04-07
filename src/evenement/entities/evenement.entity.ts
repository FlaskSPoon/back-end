import { ApiProperty } from '@nestjs/swagger';
import { CategoryEvenement } from 'src/category-evenement/entities/category-evenement.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity()
export class Evenement {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  dateEvenement: Date;

  @ApiProperty()
  @ManyToOne(() => CategoryEvenement, (category) => category.Evenements)
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEvenement;
}
