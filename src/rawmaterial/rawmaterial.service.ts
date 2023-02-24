import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RawmaterialService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.RawMaterialCreateInput) {
    return this.prisma.rawMaterial.create({
      data: {
        ...data,
        quantity: 0,
      },
    });
  }

  findAll(params: {
    where: Prisma.RawMaterialWhereInput;
    select?: Prisma.RawMaterialSelect;
  }) {
    return this.prisma.rawMaterial.findMany({
      where: params.where,
      select: params?.select,
    });
  }

  findOne(params: {
    where: Prisma.RawMaterialWhereUniqueInput;
    select?: Prisma.RawMaterialSelect;
  }) {
    return this.prisma.rawMaterial.findUnique({
      where: params.where,
      select: params?.select,
    });
  }

  searchRawMaterial(query: string) {
    return this.prisma.rawMaterial.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });
  }

  update(id: string, data: Prisma.RawMaterialUpdateInput) {
    return this.prisma.rawMaterial.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.rawMaterial.delete({
      where: { id },
    });
  }
}
