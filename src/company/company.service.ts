import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.CompanyCreateInput) {
    return this.prisma.company.create({
      data: {
        ...data,
        roles: {
          create: {
            name: 'Admin',
            access: ['admin'],
            users: {
              create: {
                name: data.name,
                username: 'admin',
                password: hashSync(data.password, 8),
                accessKey: '1234',
                company: {
                  connect: {
                    CNPJ: data.CNPJ,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  findAll(params?: {
    where: Prisma.CompanyWhereInput;
    select?: Prisma.CompanySelect;
  }) {
    return this.prisma.company.findMany(params);
  }

  findOne(params: {
    where: Prisma.CompanyWhereUniqueInput;
    select?: Prisma.CompanySelect;
  }) {
    return this.prisma.company.findUnique({
      where: params.where,
      select: params.select,
    });
  }

  update(id: string, data: Prisma.CompanyUpdateInput) {
    return this.prisma.company.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.company.delete({
      where: { id },
    });
  }
}
