import { Prisma } from '@prisma/client';
import * as yup from 'yup';

export class CreateCompanyDto {
  name: string;
  CNPJ: string;
  key: string;
  password: string;
  additionalInfo?: string;

  formatBody(
    body: Omit<CreateCompanyDto, 'formatBody' | 'generateYupSchema'>,
  ): Prisma.CompanyCreateInput {
    const { name, CNPJ, key, password, additionalInfo } = body;

    return {
      name,
      CNPJ,
      key,
      password,
      additionalInfo,
    };
  }

  generateYupSchema() {
    return yup.object().shape({
      name: yup.string().required(),
      CNPJ: yup.string().required(),
      key: yup.string().required(),
      password: yup.string().required(),
      additionalInfo: yup.string(),
    });
  }
}
