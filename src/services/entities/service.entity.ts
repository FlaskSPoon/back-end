import { ApiProperty } from "@nestjs/swagger";
import { CategoryService } from "src/category-services/entities/category-service.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('service')
export class Service {

    @PrimaryGeneratedColumn()
    id: number;
  
     @ApiProperty()
    @Column()
    name: string;
  
    @ApiProperty()
    @Column()
    description: string;
  
    @ApiProperty()
    @Column('float')
    price: number;
  
    @ManyToOne(() => CategoryService, (category) => category.services)
    category: CategoryService;
  
    @ApiProperty()
    @Column()
    createdAt: Date;
}
