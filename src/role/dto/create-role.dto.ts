import { Prisma } from '@prisma/client';
import * as yup from 'yup';

type Role =
  | 'admin'
  | 'analysis'
  | 'raw_material'
  | 'formula'
  | 'production_order'
  | 'user'
  | 'view_production_order'
  | 'create_production_order'
  | 'update_production_order'
  | 'delete_production_order'
  | 'view_raw_material'
  | 'create_raw_material'
  | 'update_raw_material'
  | 'delete_raw_material'
  | 'view_formula'
  | 'create_formula'
  | 'update_formula'
  | 'delete_formula'
  | 'view_user'
  | 'create_user'
  | 'update_user'
  | 'delete_user'
  | 'insert_analysis'
  | 'view_analysis'
  | 'create_analysis'
  | 'update_analysis'
  | 'delete_analysis';
export class CreateRoleDto {
  name: string;
  access: Role[];
  companyId: string;

  formatBody(
    body: Omit<CreateRoleDto, 'formatBody' | 'generateYupSchema'>,
  ): Prisma.RoleCreateInput {
    const { name, access, companyId } = body;

    return {
      name,
      access,
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
      access: yup.array(yup.string()).required(),
      companyId: yup.string().required(),
    });
  }
}
