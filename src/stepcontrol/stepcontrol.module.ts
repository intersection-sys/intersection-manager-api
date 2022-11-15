import { Module } from '@nestjs/common';
import { StepcontrolService } from './stepcontrol.service';
import { StepcontrolController } from './stepcontrol.controller';

@Module({
  controllers: [StepcontrolController],
  providers: [StepcontrolService]
})
export class StepcontrolModule {}
