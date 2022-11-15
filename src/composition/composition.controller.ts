import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompositionService } from './composition.service';
import { CreateCompositionDto } from './dto/create-composition.dto';
import { UpdateCompositionDto } from './dto/update-composition.dto';

@Controller('composition')
export class CompositionController {
  constructor(private readonly compositionService: CompositionService) {}

  @Post()
  create(@Body() createCompositionDto: CreateCompositionDto) {
    return this.compositionService.create(createCompositionDto);
  }

  @Get()
  findAll() {
    return this.compositionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compositionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompositionDto: UpdateCompositionDto) {
    return this.compositionService.update(+id, updateCompositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compositionService.remove(+id);
  }
}
