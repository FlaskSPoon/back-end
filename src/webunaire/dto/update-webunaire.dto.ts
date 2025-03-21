import { PartialType } from '@nestjs/swagger';
import { CreateWebinaireDto } from './create-webunaire.dto';


export class UpdateWebunaireDto extends PartialType(CreateWebinaireDto) {

}
