import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AnalysisService } from './analysis.service';
import { UpdateAnalysisDto } from './dto/update-analysis.dto';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post()
  create(@Body() data: Prisma.AnalysisCreateInput) {
    return this.analysisService.create(data);
  }

  @Get()
  findAll() {
    return this.analysisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.analysisService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnalysisDto: UpdateAnalysisDto,
  ) {
    return this.analysisService.update(id, updateAnalysisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.analysisService.remove(id);
  }
}
