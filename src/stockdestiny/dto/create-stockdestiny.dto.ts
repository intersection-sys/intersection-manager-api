import { Prisma } from '@prisma/client';
import * as yup from 'yup';

export class CreateStockDestinyDto {
  quantity: number;
  description: string;
  stockId: string;
  rawMaterialId: string;
  wasted?: boolean;
  productionOrderId?: string;

  formatBody(
    body: Omit<CreateStockDestinyDto, 'formatBody' | 'generateYupSchema'>,
  ): Prisma.StockDestinyCreateInput {
    const {
      quantity,
      description,
      stockId,
      rawMaterialId,
      productionOrderId,
      wasted,
    } = body;

    return {
      quantity,
      description,
      productionOrderId,
      wasted,
      rawMaterial: {
        connect: {
          id: rawMaterialId,
        },
      },
      stock: {
        connect: {
          id: stockId,
        },
      },
    };
  }

  generateYupSchema() {
    return yup.object().shape({
      quantity: yup.number().required(),
      description: yup.string().required(),
      stockId: yup.string().required(),
      rawMaterialId: yup.string().required(),
      wasted: yup.boolean(),
      productionOrderId: yup.string(),
    });
  }
}
