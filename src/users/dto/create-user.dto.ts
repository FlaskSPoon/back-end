import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { IsEmail, IsString, MinLength } from "class-validator";


export class CreateUserDto implements Prisma.UserCreateInput{

      @ApiProperty()
      @IsString()
      readonly username: string;
      @ApiProperty()
      @IsEmail()
      readonly email: string;
      @ApiProperty()
      @IsString()
      @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères.' })
      readonly password: string;
     
}
