import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [UsersModule, ConfigModule, JwtModule.registerAsync({
    global: true,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return {
        secret: configService.get('AUTH_TOKEN'),
        signOptions: { expiresIn: '60s' },
      }
    },
  })],
  providers: [AuthService],
  controllers: [AuthController],
})

export class AuthModule { }
