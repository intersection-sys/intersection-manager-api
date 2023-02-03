import { Prisma } from '@prisma/client';
import * as yup from 'yup';

type ProcedureStep = {
  workInstructions: string;
};

export class CreateFormulaDto {
  name: string;
  shelfLife: number;
  components: {
    percentage: number;
    rawMaterialId: string;
  }[];
  procedure: {
    weighing: ProcedureStep;
    production: ProcedureStep;
    analysis: ProcedureStep;
    filling: ProcedureStep;
    storage: ProcedureStep;
  };
  companyId: string;

  formatBody(
    body: Omit<CreateFormulaDto, 'formatBody' | 'generateYupSchema'>,
  ): Prisma.FormulaCreateInput {
    const { name, components, shelfLife, companyId, procedure } = body;

    const mappedComponents = components.map((component) => ({
      percentage: component.percentage,
      rawMaterial: {
        connect: {
          id: component.rawMaterialId,
        },
      },
    }));

    return {
      name,
      shelfLife,
      components: {
        create: mappedComponents,
      },
      procedure: {
        create: procedure,
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
      name: yup.string().required(),
      shelfLife: yup.number().required(),
      companyId: yup.string().required(),
      components: yup
        .array(
          yup.object().shape({
            percentage: yup.number().required(),
            rawMaterialId: yup.string().required(),
          }),
        )
        .required(),
      procedure: yup.object().shape({
        weighing: yup.object().shape({
          workInstructions: yup.string().required(),
        }),
        production: yup.object().shape({
          workInstructions: yup.string().required(),
        }),
        analysis: yup.object().shape({
          workInstructions: yup.string().required(),
        }),
        filling: yup.object().shape({
          workInstructions: yup.string().required(),
        }),
        storage: yup.object().shape({
          workInstructions: yup.string().required(),
        }),
      }),
    });
  }
}
