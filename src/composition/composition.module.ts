import { Module } from '@nestjs/common';
import { CompositionService } from './composition.service';
import { CompositionController } from './composition.controller';

@Module({
  controllers: [CompositionController],
  providers: [CompositionService]
})
export class CompositionModule {}
