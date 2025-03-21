import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateNewlettreSubscribeDto {

    @IsNotEmpty()
  @IsEmail()
  email: string;
}
