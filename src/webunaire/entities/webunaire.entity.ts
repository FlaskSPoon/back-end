import { ApiProperty } from '@nestjs/swagger';
import { CategoryWebinaire } from 'src/category-webunaire/entities/category-webunaire.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn } from 'typeorm';


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
   @JoinColumn({ name: 'categoryId' })
  category: CategoryWebinaire;

  
      @ApiProperty()
      @UpdateDateColumn()
      updatedAt: Date;
}
