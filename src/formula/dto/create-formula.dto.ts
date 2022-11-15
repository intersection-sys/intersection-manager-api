import { Prisma } from '@prisma/client';
import * as yup from 'yup';
export class CreateFormulaDto {
  name: string;
  shelfLife: number;
  components: {
    percentage: number;
    rawMaterialId: string;
  }[];
  steps: {
    name: string;
    workInstructions: string;
    order: number;
  }[];
  companyId: string;

  formatBody(
    body: Omit<CreateFormulaDto, 'formatBody' | 'generateYupSchema'>,
  ): Prisma.FormulaCreateInput {
    const { name, steps, components, shelfLife, companyId } = body;

    return {
      name,
      shelfLife,
      steps: {
        create: steps,
      },
      components: {
        create: components,
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
