import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { LeadStatus } from "./enumLead";
import { ApiProperty } from "@nestjs/swagger";


@Entity('lead')
export class Lead {
@PrimaryGeneratedColumn()
id:number

  @ApiProperty()
   @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;

  @Column({ type: 'enum', enum: LeadStatus, default: LeadStatus.EN_COURS })
  @IsOptional()
  @IsEnum(LeadStatus)
  status?: LeadStatus;

}

