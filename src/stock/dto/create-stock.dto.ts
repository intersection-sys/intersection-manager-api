import { Prisma } from '@prisma/client';
import * as yup from 'yup';
export class CreateStockDto {
  quantity: number;
  cost: number;
  batch: string;
  supplier: string;
  expirationDate: Date | string;
  rawMaterialId: string;
  companyId: string;
  invoiceNumber: string;

  formatBody(
    body: Omit<CreateStockDto, 'formatBody' | 'generateYupSchema'>,
  ): Prisma.StockCreateInput {
    const {
      quantity,
      cost,
      batch,
      supplier,
      expirationDate,
      rawMaterialId,
      companyId,
      invoiceNumber,
    } = body;

    return {
      quantity,
      used: 0,
      remaining: quantity,
      cost,
      batch,
      invoiceNumber,
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
      cost: yup.number().required(),
      batch: yup.string().required(),
      invoiceNumber: yup.string().required(),
      supplier: yup.string().required(),
      expirationDate: yup.string().required(),
      rawMaterialId: yup.string().required(),
      companyId: yup.string().required(),
    });
  }
}
