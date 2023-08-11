import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { WithoutAuth } from 'src/common/decorators/without-auth.decorator';
import { CreateUserDto } from 'src/users/models/CreateUserDto';

@Controller('auth')
@WithoutAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    console.log('signInDto', signInDto)
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
