import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/index';
import { User } from './entity';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './guard/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...config.get('database'),
        entities: [User],
        synchronize: true,
      }),
    }),
    AuthModule,
    UserModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
