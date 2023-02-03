import { Injectable } from '@nestjs/common';
import { Prisma, QualityTest } from '@prisma/client';
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

      data.qualityTests = files;
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

  async update(
    id: string,
    data: Prisma.StockUpdateInput,
    qualityTests?: Express.Multer.File[],
  ) {
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

    if (qualityTests && qualityTests.length > 0) {
      const UploadFiles = async () => {
        const files: QualityTest[] = [];

        for (const file of qualityTests) {
          const { Location } = await this.s3Service.uploadFile(
            file,
            `${stock.rawMaterialId}/${stock.supplier}/`,
          );

          console.log(Location, 'loc');
          files.push({ url: Location, fileName: file.originalname });
        }

        return files;
      };

      const files = await UploadFiles();
      data.qualityTests = files;
    }

    const qualityTestsUpdated: QualityTest[] = qualityTests
      ? [...stock.qualityTests, ...(data.qualityTests as QualityTest[])]
      : stock.qualityTests;

    console.log(data.qualityTests, qualityTestsUpdated, 'asd');

    return this.prisma.stock.update({
      where: {
        id,
      },
      data: {
        ...data,
        qualityTests: qualityTestsUpdated,
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
