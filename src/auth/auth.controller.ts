import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signIn.dto';
import { SignUpDto } from './dtos/signUp.dto';
import { SignUpResponse } from './response/siginUp.response';
import { SignInResponse } from './response/signIn.response';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signin')
  @ApiOperation({ summary: 'sign in', description: '로그인' })
  @ApiResponse({ description: '성공 메시지', type: SignInResponse })
  async signIn(@Body() body: SignInDto): Promise<SignInResponse> {
    return this.authService.siginIn(body);
  }
  @Post('/signUp')
  @ApiOperation({ summary: 'sign up', description: '회원가입' })
  @ApiResponse({ type: SignUpResponse })
  signUp(@Body() body: SignUpDto): Promise<void> {
    return this.authService.siginUp(body);
  }
}
