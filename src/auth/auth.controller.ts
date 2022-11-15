import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import {
  AuthRequest as AuthRequestEntity,
  AuthResponse,
  ValidateTokenResponse,
} from 'src/entities/auth.entity';
import { UnauthorizedResponse } from 'src/entities/unauthorized.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

interface AuthRequest extends Request {
  user: User;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiUnauthorizedResponse({
    description: 'Client has no authorization to access that method.',
    type: UnauthorizedResponse,
  })
  @ApiCreatedResponse({
    description: 'Access Token',
    type: AuthResponse,
  })
  @ApiBody({
    type: AuthRequestEntity,
  })
  @Post()
  login(@Req() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  @ApiOkResponse({
    description: 'Validate access token. Front-end persistence.',
    type: ValidateTokenResponse,
  })
  @ApiOperation({ summary: 'Validate access token' })
  @Post('/validate')
  revalidateToken(@Body() body: { token: string }) {
    return this.authService.validateToken(body.token);
  }
}
