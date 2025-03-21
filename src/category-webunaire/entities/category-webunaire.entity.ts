import { ApiProperty } from '@nestjs/swagger';
import { Webinaire } from 'src/webunaire/entities/webunaire.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('categorywebinaire')
export class CategoryWebinaire {
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
  @OneToMany(() => Webinaire, (webinaire) => webinaire.category)
  Webinaires: Webinaire[];
}
