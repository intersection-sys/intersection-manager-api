import { Prisma } from '@prisma/client';
import * as yup from 'yup';
export class CreateStepDto {
  name: string;
  workInstructions: string;
  order: number;
  formulaId: string;

  formatBody(
    body: Omit<CreateStepDto, 'formatBody' | 'generateYupSchema'>,
  ): Prisma.StepCreateInput {
    const { name, workInstructions, order, formulaId } = body;

    return {
      name,
      workInstructions,
      order,
      formula: {
        connect: {
          id: formulaId,
        },
      },
    };
  }

  generateYupSchema() {
    return yup.object().shape({
      name: yup.number().required(),
      workInstructions: yup.number().required(),
      order: yup.number().required(),
      formulaId: yup.string().required(),
    });
  }
}
