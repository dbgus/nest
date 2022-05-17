import {
  ConflictException,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entity/index';
import { SignInResponse } from './response/signIn.response';
import { comparePassword, encrypt } from '../utils/hashing';
import * as RA from 'ramda-adjunct';
import { SignInDto } from './dtos/signIn.dto';
import { SignUpDto } from './dtos/signUp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtSer: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async siginIn(parm: SignInDto): Promise<SignInResponse> {
    const userData = await this.userRepository.findOne({
      where: { email: parm.email },
    });

    if (RA.isNilOrEmpty(userData)) {
      throw new UnauthorizedException('user email not match');
    }

    if (!(await comparePassword(parm.password, userData.password))) {
      throw new UnauthorizedException('password not match');
    }

    return {
      token: await this.jwtSer.sign({ id: 1, expire_at: 0 }),
    };
  }

  async siginUp(parm: SignUpDto): Promise<void> {
    const user = await this.userRepository.find({
      where: { email: parm.email },
    });
    if (!RA.isNilOrEmpty(user)) {
      throw new ConflictException('user duplicated');
    }
    try {
      await this.userRepository.save({
        email: parm.email,
        name: parm.name,
        password: await encrypt(parm.password),
      });
    } catch (error) {
      throw new ServiceUnavailableException('server error');
    }
  }
}
