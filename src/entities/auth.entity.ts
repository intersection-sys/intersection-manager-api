import { ApiProperty } from '@nestjs/swagger';

export class UserAuthResponse {
  @ApiProperty({
    type: String,
    description: 'User id',
    example: '62e95fcc0f86f5c4877bef5d',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Name',
    example: 'Rafael',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Username',
    example: 'username',
  })
  username: string;
}
export class AuthResponse {
  @ApiProperty({
    type: String,
    description: 'JWT access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzAzZWY5NTI2M2NiZTA5ZTNiODNmMGIiLCJ1c2VybmFtZSI6InJhZmEiLCJpYXQiOjE2NjEyMTc2OTcsasd4cCI6MTY2MTM5MDQ5N30.v56wqBP6ukzpNoLVs2dsQssgexjdjkanVs8T_c6llpX0',
  })
  token: string;

  @ApiProperty({
    type: UserAuthResponse,
    description: 'User',
  })
  user: UserAuthResponse;
}

export class ValidateTokenResponse extends UserAuthResponse {}

export class AuthRequest {
  @ApiProperty({
    type: String,
    description: 'Username',
    example: 'user123',
  })
  username: string;

  @ApiProperty({
    type: String,
    description: 'Password',
    example: '123456Asd@',
  })
  password: string;
}
