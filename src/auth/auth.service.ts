import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return null;
    }

    const passwordIsValid = await compare(password, user.password);

    if (!passwordIsValid) return null;

    return user;
  }

  async login(user: User) {
    const payload = {
      id: user.id,
      username: user.username,
      name: user.name,
    };

    return {
      token: this.jwtService.sign(payload),
      user: payload,
    };
  }

  async validateToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      return {
        id: data.id,
        name: data.name,
        username: data.username,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
