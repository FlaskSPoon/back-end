import { ApiProperty } from "@nestjs/swagger";
import { CategoryService } from "src/category-services/entities/category-service.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
   @JoinColumn({ name: 'categoryId' })
    category: CategoryService;
  
    @ApiProperty()
    @Column()
    createdAt: Date;

      
    
        // @ApiProperty()
        // @UpdateDateColumn()
        // updatedAt: Date;
}
