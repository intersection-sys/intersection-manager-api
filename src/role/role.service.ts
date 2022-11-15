import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.RoleCreateInput) {
    return this.prisma.role.create({ data });
  }

  findAll(params?: {
    where: Prisma.RoleWhereInput;
    select?: Prisma.RoleSelect;
  }) {
    return this.prisma.role.findMany(params);
  }

  findOne(id: string) {
    return this.prisma.role.findUnique({ where: { id } });
  }

  async update(id: string, body: UpdateRoleDto) {
    let access: string[];

    if (!Array.isArray(body.access)) {
      const role = await this.prisma.role.findUnique({
        where: {
          id,
        },
      });

      const arr = [...role.access];
      access = arr
        .concat(body.access?.add ? body.access?.add : [])
        .filter(
          (roleAccess) => !(body.access as any)?.remove?.includes(roleAccess),
        );
    }

    const data: any = {};
    body.name && (data.name = body.name);
    body.access && (data.access = access);

    return this.prisma.role.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.role.delete({
      where: { id },
    });
  }
}
