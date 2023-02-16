import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { S3Service } from 'src/s3.service';

@Injectable()
export class StockService {
  constructor(private prisma: PrismaService, private s3Service: S3Service) {}

  async create(
    data: Prisma.StockCreateInput,
    qualityTests?: Express.Multer.File[],
  ) {
    if (qualityTests && qualityTests.length > 0) {
      const files = [];

      qualityTests.forEach(async (file) => {
        const { Location } = await this.s3Service.uploadFile(
          file,
          `${data.rawMaterial.connect.id}/${data.supplier}/`,
        );

        files.push({ url: Location, fileName: file.filename });
      });

      data.qualityTests = { create: files };
    }

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

  findOne(params: {
    where: Prisma.StockWhereUniqueInput;
    select?: Prisma.StockSelect;
  }) {
    return this.prisma.stock.findUnique({
      where: params.where,
      select: params?.select,
    });
  }

  async update(id: string, data: Prisma.StockUpdateInput) {
    const stock = await this.prisma.stock.findUnique({ where: { id } });

    if (data.quantity) {
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
      data: {
        ...data,
      },
    });
  }

  async uploadQualityTests(
    data: Partial<Prisma.QualityTestCreateInput>,
    qualityTests: Express.Multer.File[],
  ) {
    const uploadFiles = async () => {
      const files = [];

      for await (const file of qualityTests) {
        const { Location } = await this.s3Service.uploadFile(
          file,
          `${data.stock.connect.id}/`,
        );

        files.push({ url: Location, fileName: file.originalname });
      }

      return files;
    };

    const uploadedFiles = await uploadFiles();

    const createInput = uploadedFiles.map((file) => ({
      stockId: data.stock.connect.id,
      fileName: file.fileName,
      url: file.url,
    }));

    return this.prisma.qualityTest.createMany({
      data: createInput,
    });
  }

  async deleteQualityTests(ids: string[]) {
    return this.prisma.qualityTest.deleteMany({
      where: {
        id: { in: ids },
      },
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
