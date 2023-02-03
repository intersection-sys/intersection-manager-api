import { Prisma } from '@prisma/client';
import * as yup from 'yup';
export class CreateRawMaterialDto {
  name: string;
  unit: string;
  companyId: string;
  stockLimit: number;

  formatBody(
    body: Omit<CreateRawMaterialDto, 'formatBody' | 'generateYupSchema'>,
  ): Prisma.RawMaterialCreateInput {
    const { name, unit, companyId, stockLimit } = body;

    return {
      name,
      unit,
      stockLimit: stockLimit || -1,
      company: {
        connect: {
          id: companyId,
        },
      },
    };
  }

  generateYupSchema() {
    return yup.object().shape({
      name: yup.string().required(),
      unit: yup.string().required(),
      companyId: yup.string().required(),
      stockLimit: yup.number(),
    });
  }
}
