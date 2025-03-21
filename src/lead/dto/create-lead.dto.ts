import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { LeadStatus } from "../entities/enumLead";

export class CreateLeadDto {
    @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsEnum(LeadStatus)
  status?: LeadStatus;
}
