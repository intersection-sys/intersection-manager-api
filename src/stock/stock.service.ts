import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StockService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.StockCreateInput) {
    await this.prisma.rawMaterial.update({
      where: {
        id: data.rawMaterial.connect.id,
      },
      data: {
        quantity: {
          increment: data.quantity,
        },
      },
    });

    return this.prisma.stock.create({ data });
  }

  findAll(params?: {
    where: Prisma.StockWhereInput;
    select?: Prisma.StockSelect;
  }) {
    return this.prisma.stock.findMany({
      where: params.where,
      select: params.select,
    });
  }

  findOne(id: string) {
    return this.prisma.stock.findUnique({ where: { id } });
  }

  async update(id: string, data: Prisma.StockUpdateInput) {
    if (data.quantity) {
      const stock = await this.prisma.stock.findUnique({ where: { id } });
      await this.prisma.rawMaterial.update({
        where: {
          id: stock.rawMaterialId,
        },
        data: {
          quantity: {
            increment: Number(data.quantity) - stock.quantity,
          },
        },
      });
    }

    return this.prisma.stock.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    const stock = await this.prisma.stock.delete({
      where: { id },
    });

    await this.prisma.rawMaterial.update({
      where: {
        id: stock.rawMaterialId,
      },
      data: {
        quantity: {
          decrement: stock.quantity,
        },
      },
    });

    return stock;
  }
}
