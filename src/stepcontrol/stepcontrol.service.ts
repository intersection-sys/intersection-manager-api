import { Injectable } from '@nestjs/common';
import { CreateStepcontrolDto } from './dto/create-stepcontrol.dto';
import { UpdateStepcontrolDto } from './dto/update-stepcontrol.dto';

@Injectable()
export class StepcontrolService {
  create(createStepcontrolDto: CreateStepcontrolDto) {
    return 'This action adds a new stepcontrol';
  }

  findAll() {
    return `This action returns all stepcontrol`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stepcontrol`;
  }

  update(id: number, updateStepcontrolDto: UpdateStepcontrolDto) {
    return `This action updates a #${id} stepcontrol`;
  }

  remove(id: number) {
    return `This action removes a #${id} stepcontrol`;
  }
}
