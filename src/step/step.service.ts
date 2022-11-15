import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StepService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.StepCreateInput) {
    return this.prisma.step.create({ data });
  }

  findAll(params?: {
    where: Prisma.StepWhereInput;
    select: Prisma.StepSelect;
  }) {
    return this.prisma.step.findMany({
      where: params.where,
      select: params.select,
    });
  }

  findOne(id: string) {
    return this.prisma.step.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.StepUpdateInput) {
    return this.prisma.step.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.step.delete({
      where: { id },
    });
  }
}
