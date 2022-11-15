import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedResponse {
  @ApiProperty({
    type: Number,
    description: 'Status code',
    example: 401,
  })
  statusCode: number;
  @ApiProperty({
    type: String,
    description: 'Status code',
    example: 'Unauthorized',
  })
  message: string;
}
