import { ApiProperty } from '@nestjs/swagger';
import { Service } from 'src/services/entities/service.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity('categoryservice')
export class CategoryService {
  @PrimaryGeneratedColumn()
  id: number;

   @ApiProperty()
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Service, (service) => service.category)
  services: Service[];

  @ApiProperty()
  @Column()
  createdAt: Date;
    
  
      @ApiProperty()
      @UpdateDateColumn()
      updatedAt: Date;

}