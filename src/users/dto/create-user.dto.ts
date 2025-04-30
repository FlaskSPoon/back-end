import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ROLE } from '@prisma/client';
import { IsEmail, IsString, IsNotEmpty, MinLength, Matches, IsOptional, IsInt, IsEnum } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, {
    message: 'L\'email doit être au format exemple@gmail.com'
  })
  email: string;

  @ApiProperty()
@IsString()
@IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty({ enum: ROLE })
  @IsEnum(ROLE)
  role: ROLE;
}
