import { ApiProperty } from '@nestjs/swagger';

export class ForbiddenResponse {
  @ApiProperty({
    type: Number,
    description: 'Status code',
    example: 403,
  })
  statusCode: number;
  @ApiProperty({
    type: String,
    description: 'Message',
    example: 'Forbidden resource',
  })
  message: string;
  @ApiProperty({
    type: String,
    description: 'Error',
    example: 'Forbidden',
  })
  error: string;
}
