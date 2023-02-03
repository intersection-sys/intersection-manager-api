import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StockDestinyService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.StockDestinyCreateInput) {
    const updateRawMaterial = async () =>
      await this.prisma.rawMaterial.update({
        where: {
          id: data.rawMaterial.connect.id,
        },
        data: {
          quantity: {
            decrement: data.quantity,
          },
        },
      });

    const updateStock = async () =>
      await this.prisma.stock.update({
        where: {
          id: data.stock.connect.id,
        },
        data: {
          used: {
            increment: data.quantity,
          },
          remaining: {
            decrement: data.quantity,
          },
        },
      });

    await Promise.all([updateRawMaterial(), updateStock()]);

    return this.prisma.stockDestiny.create({ data });
  }

  findAll(params?: {
    where: Prisma.StockWhereInput;
    select?: Prisma.StockSelect;
  }) {
    return this.prisma.stockDestiny.findMany({
      where: params.where,
      select: params.select,
    });
  }

  findOne(params: {
    where: Prisma.StockDestinyWhereUniqueInput;
    select?: Prisma.StockDestinySelect;
  }) {
    return this.prisma.stockDestiny.findUnique({
      where: params.where,
      select: params?.select,
    });
  }

  async update(id: string, data: Prisma.StockUpdateInput) {
    if (data.quantity) {
      const stockDestiny = await this.prisma.stockDestiny.findUnique({
        where: { id },
      });

      const updateRawMaterial = async () =>
        await this.prisma.rawMaterial.update({
          where: {
            id: stockDestiny.rawMaterialId,
          },
          data: {
            quantity: {
              increment: stockDestiny.quantity - Number(data.quantity),
            },
          },
        });

      const updateStock = async () =>
        await this.prisma.stock.update({
          where: {
            id: stockDestiny.stockId,
          },
          data: {
            used: {
              decrement: stockDestiny.quantity + Number(data.quantity),
            },
            remaining: {
              increment: stockDestiny.quantity - Number(data.quantity),
            },
          },
        });

      await Promise.all([updateRawMaterial(), updateStock()]);
    }

    return this.prisma.stockDestiny.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    const stockDestiny = await this.prisma.stockDestiny.delete({
      where: { id },
    });

    const updateRawMaterial = async () =>
      await this.prisma.rawMaterial.update({
        where: {
          id: stockDestiny.rawMaterialId,
        },
        data: {
          quantity: {
            increment: stockDestiny.quantity,
          },
        },
      });

    const updateStock = async () =>
      await this.prisma.stock.update({
        where: {
          id: stockDestiny.stockId,
        },
        data: {
          used: {
            decrement: stockDestiny.quantity,
          },
          remaining: {
            increment: stockDestiny.quantity,
          },
        },
      });

    await Promise.all([updateRawMaterial(), updateStock()]);

    return stockDestiny;
  }
}
