import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('newslettersubscriber')
export class NewlettreSubscribe {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ApiProperty()
    @Column({ unique: true })
    @IsNotEmpty()
    @IsEmail()
    email: string;
  

     @ApiProperty()
       @CreateDateColumn()
       createdAt: Date;
     
   
       @ApiProperty()
       @UpdateDateColumn()
       updatedAt: Date;
}
