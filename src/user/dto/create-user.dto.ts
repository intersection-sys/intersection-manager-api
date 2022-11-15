import { Prisma } from '@prisma/client';
import * as yup from 'yup';

export class CreateUserDto {
  name: string;
  username: string;
  password: string;
  accessKey: string;
  roleId: string;
  companyId: string;
  additionalInfo?: string;

  formatBody(
    body: Omit<CreateUserDto, 'formatBody' | 'generateYupSchema'>,
  ): Prisma.UserCreateInput {
    const {
      name,
      username,
      password,
      accessKey,
      roleId,
      companyId,
      additionalInfo,
    } = body;

    return {
      name,
      username,
      password,
      accessKey,
      role: {
        connect: {
          id: roleId,
        },
      },
      company: {
        connect: {
          id: companyId,
        },
      },
      additionalInfo,
    };
  }

  generateYupSchema() {
    return yup.object().shape({
      name: yup.string().required(),
      username: yup.string().required(),
      password: yup.string().required(),
      accessKey: yup.string().required(),
      roleId: yup.string().required(),
      companyId: yup.string().required(),
      additionalInfo: yup.string().required(),
    });
  }
}
