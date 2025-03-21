import { PartialType } from '@nestjs/swagger';
import { CreateNewlettreSubscribeDto } from './create-newlettre-subscribe.dto';

export class UpdateNewlettreSubscribeDto extends PartialType(CreateNewlettreSubscribeDto) {}
