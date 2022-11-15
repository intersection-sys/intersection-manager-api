import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StepcontrolService } from './stepcontrol.service';
import { CreateStepcontrolDto } from './dto/create-stepcontrol.dto';
import { UpdateStepcontrolDto } from './dto/update-stepcontrol.dto';

@Controller('stepcontrol')
export class StepcontrolController {
  constructor(private readonly stepcontrolService: StepcontrolService) {}

  @Post()
  create(@Body() createStepcontrolDto: CreateStepcontrolDto) {
    return this.stepcontrolService.create(createStepcontrolDto);
  }

  @Get()
  findAll() {
    return this.stepcontrolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stepcontrolService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStepcontrolDto: UpdateStepcontrolDto) {
    return this.stepcontrolService.update(+id, updateStepcontrolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stepcontrolService.remove(+id);
  }
}
