import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateFormulaDto } from './dto/create-formula.dto';
import { UpdateFormulaDto } from './dto/update-formula.dto';

@Injectable()
export class FormulaService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.FormulaCreateInput) {
    return this.prisma.formula.create({ data });
  }

  findAll(params?: {
    where: Prisma.FormulaWhereInput;
    select?: Prisma.FormulaSelect;
  }) {
    return this.prisma.formula.findMany({
      where: params.where,
      select: params.select,
    });
  }

  findOne(id: string) {
    return this.prisma.formula.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.FormulaUpdateInput) {
    return this.prisma.formula.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.formula.delete({
      where: { id },
    });
  }
}
