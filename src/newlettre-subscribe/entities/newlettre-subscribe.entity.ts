import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
