import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository (User) private readonly userRepository: Repository<User>) { }

  async create({ email, password }: { email: string; password: string }) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const newUser = this.userRepository.insert({
      email,
      password: hash,
    });

     return newUser;
  }
  
  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ select: ['id', 'email', 'password'], where: { email } });
  }
}
