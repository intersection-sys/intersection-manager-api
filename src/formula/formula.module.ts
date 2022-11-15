import { Module } from '@nestjs/common';
import { FormulaService } from './formula.service';
import { FormulaController } from './formula.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FormulaController],
  providers: [FormulaService, PrismaService],
})
export class FormulaModule {}
