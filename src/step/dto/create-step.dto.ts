import { Prisma } from '@prisma/client';
import * as yup from 'yup';
export class CreateStepDto {
  stepName: string;
  startedAt: string | Date;
  endedAt: string | Date;
  elapsedTime: number;
  userId: string;
  formulaId: string;
  productionOrderId: string;

  formatBody(
    body: Omit<CreateStepDto, 'formatBody' | 'generateYupSchema'>,
  ): Prisma.StepCreateInput {
    const {
      stepName,
      startedAt,
      endedAt,
      elapsedTime,
      userId,
      formulaId,
      productionOrderId,
    } = body;

    return {
      stepName,
      startedAt,
      endedAt,
      elapsedTime,
      formula: {
        connect: {
          id: formulaId,
        },
      },
      productionOrder: {
        connect: {
          id: productionOrderId,
        },
      },
      technicalManager: {
        connect: {
          id: userId,
        },
      },
    };
  }

  generateYupSchema() {
    return yup.object().shape({
      stepName: yup.number().required(),
      startedAt: yup.string().required(),
      endedAt: yup.string().required(),
      elapsedTime: yup.string().required(),
      userId: yup.string().required(),
      formulaId: yup.string().required(),
      productionOrderId: yup.string().required(),
    });
  }
}

/**?
   stepName: string;
  startedAt: string | Date;
  endedAt: string | Date;
  elapsedTime: number;
  userId: string;
  formulaId: string;
  productionOrderId: string;

 */
