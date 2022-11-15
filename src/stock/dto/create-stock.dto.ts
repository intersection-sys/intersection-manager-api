import { Prisma } from '@prisma/client';
import * as yup from 'yup';
export class CreateStockDto {
  quantity: number;
  unitCost: number;
  batch: string;
  supplier: string;
  expirationDate: Date | string;
  rawMaterialId: string;
  companyId: string;

  formatBody(
    body: Omit<CreateStockDto, 'formatBody' | 'generateYupSchema'>,
  ): Prisma.StockCreateInput {
    const {
      quantity,
      unitCost,
      batch,
      supplier,
      expirationDate,
      rawMaterialId,
      companyId,
    } = body;

    return {
      quantity,
      unitCost,
      batch,
      supplier,
      expirationDate,
      rawMaterial: {
        connect: {
          id: rawMaterialId,
        },
      },
      company: {
        connect: {
          id: companyId,
        },
      },
    };
  }

  generateYupSchema() {
    return yup.object().shape({
      quantity: yup.number().required(),
      unitCost: yup.number().required(),
      batch: yup.string().required(),
      supplier: yup.string().required(),
      expirationDate: yup.string().required(),
      rawMaterialId: yup.string().required(),
      companyId: yup.string().required(),
    });
  }
}
