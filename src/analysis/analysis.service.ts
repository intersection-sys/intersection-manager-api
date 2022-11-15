import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AnalysisService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.AnalysisCreateInput) {
    return this.prisma.analysis.create({ data });
  }

  findAll(params?: {
    where: Prisma.AnalysisWhereInput;
    select: Prisma.AnalysisSelect;
  }) {
    return this.prisma.analysis.findMany({
      where: params.where,
      select: params.select,
    });
  }

  findOne(id: string) {
    return this.prisma.analysis.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.AnalysisUpdateInput) {
    return this.prisma.analysis.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.analysis.delete({
      where: { id },
    });
  }
}
