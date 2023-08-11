import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/models/CreateUserDto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(email, pass) {
    const user = await this.usersService.findOne(email);

    if (!await bcrypt.compare(pass, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.email };
    
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerData: CreateUserDto) {
    const user = await this.usersService.create(registerData);

    return user;
  }
}
