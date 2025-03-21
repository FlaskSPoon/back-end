import { ApiProperty } from '@nestjs/swagger';
import { CategoryWebinaire } from 'src/category-webunaire/entities/category-webunaire.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity()
export class Webinaire {
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
  dateWebinaire: Date;

  @ApiProperty()
  @ManyToOne(() => CategoryWebinaire, (category) => category.Webinaires)
  category: CategoryWebinaire;
}
