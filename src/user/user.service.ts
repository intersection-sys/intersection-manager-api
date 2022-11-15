import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { isValidPassword, isValidUsername } from 'src/utils/validateUser';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    if (!isValidUsername(data.username)) {
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        error: 'Invalid username!',
      });
    }
    if (!isValidPassword(data.password)) {
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        error: 'Invalid password!',
      });
    }

    const thisUsernameAlreadyExists = await this.prisma.user.findUnique({
      where: { username: data.username },
    });

    if (thisUsernameAlreadyExists) {
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        error: 'User with this username already exists!',
      });
    }

    const password = await hash(data.password, 8);

    return this.prisma.user.create({
      data: {
        ...data,
        password,
      },
    });
  }

  findAll(params?: {
    where: Prisma.UserWhereInput;
    select?: Prisma.UserSelect;
  }) {
    return this.prisma.user.findMany({
      where: params?.where,
      select: params?.select,
    });
  }

  findOne(params: {
    where: Prisma.UserWhereUniqueInput;
    select?: Prisma.UserSelect;
  }): Promise<Partial<User>> {
    return this.prisma.user.findUnique({
      where: params.where,
      select: params.select,
    });
  }

  update(id: string, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
