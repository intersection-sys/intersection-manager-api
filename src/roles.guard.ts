import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from './prisma.service';
import { Role } from './enums/role.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles[0] === 'DEV') {
      return true;
    }

    const {
      headers: { authorization },
    } = context.switchToHttp().getRequest();

    if (!authorization) return false;

    const token = authorization.replace('Bearer ', '');
    const data = this.jwtService.decode(token);
    const user = await this.prisma.user.findUnique({
      where: { id: data['id'] },
      select: {
        role: true,
      },
    });

    if (!user || !user.role) return false;
    if (user.role.access.includes('admin')) return true;

    return requiredRoles.some((role) => user.role.access.includes(role));
  }
}
