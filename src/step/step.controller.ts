import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { StepService } from './step.service';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';

@Controller('step')
export class StepController {
  constructor(private readonly stepService: StepService) {}

  @Post()
  async create(@Body() body: CreateStepDto) {
    const schema = CreateStepDto.prototype.generateYupSchema();
    try {
      await schema.validate(body);
    } catch (error: any) {
      throw new BadRequestException(error.errors);
    }

    const data = CreateStepDto.prototype.formatBody(body);
    return this.stepService.create(data);
  }

  @Get()
  findAll() {
    return this.stepService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stepService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStepDto: UpdateStepDto) {
    return this.stepService.update(id, updateStepDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stepService.remove(id);
  }
}
