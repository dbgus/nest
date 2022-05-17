import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { UserInfoResponse } from './response/user-info.response';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  @ApiOperation({ summary: 'user info', description: 'user 개인 정보' })
  @ApiResponse({ type: UserInfoResponse })
  async userInfo(@Req() req): Promise<UserInfoResponse> {
    return this.userService.userInfo(req.user.userId).then((user) => {
      return plainToInstance(UserInfoResponse, user, {
        excludeExtraneousValues: true,
      });
    });
  }
}
