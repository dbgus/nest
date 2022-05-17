import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserInfoResponse {
  @Expose()
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  @Expose()
  name: string;

  @ApiProperty({ type: String })
  @Expose()
  email: string;
}
