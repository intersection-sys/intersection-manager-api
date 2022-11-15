import { PartialType } from '@nestjs/mapped-types';
import { CreateStepcontrolDto } from './create-stepcontrol.dto';

export class UpdateStepcontrolDto extends PartialType(CreateStepcontrolDto) {}
