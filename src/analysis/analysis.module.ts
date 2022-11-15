import { Module } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AnalysisController } from './analysis.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AnalysisController],
  providers: [AnalysisService, PrismaService],
})
export class AnalysisModule {}
