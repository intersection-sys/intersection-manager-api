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
import { FormulaService } from './formula.service';
import { CreateFormulaDto } from './dto/create-formula.dto';
import { UpdateFormulaDto } from './dto/update-formula.dto';

@Controller('formula')
export class FormulaController {
  constructor(private readonly formulaService: FormulaService) {}

  @Post()
  async create(@Body() body: CreateFormulaDto) {
    const schema = CreateFormulaDto.prototype.generateYupSchema();
    try {
      await schema.validate(body);
    } catch (error: any) {
      throw new BadRequestException(error.errors);
    }

    const data = CreateFormulaDto.prototype.formatBody(body);
    return this.formulaService.create(data);
  }

  @Get()
  findAll() {
    return this.formulaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formulaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormulaDto: UpdateFormulaDto) {
    return this.formulaService.update(id, updateFormulaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formulaService.remove(id);
  }
}
