import { Module } from '@nestjs/common';
import { NewlettreSubscribeService } from './newlettre-subscribe.service';
import { NewlettreSubscribeController } from './newlettre-subscribe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewlettreSubscribe } from './entities/newlettre-subscribe.entity';

@Module({
  imports:[TypeOrmModule.forFeature([NewlettreSubscribe])],
  controllers: [NewlettreSubscribeController],
  providers: [NewlettreSubscribeService],
})
export class NewlettreSubscribeModule {}
