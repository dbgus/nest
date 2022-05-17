import { ApiProperty } from '@nestjs/swagger';

export class SignUpResponse {
  @ApiProperty()
  message: string;
}
