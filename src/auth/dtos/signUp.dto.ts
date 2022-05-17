import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SignUpDto {
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsString()
  password: string;
  @ApiProperty()
  @IsString()
  name: string;
}
