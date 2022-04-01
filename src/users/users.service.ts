import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { AuthUserInput } from './dto/signup-user-input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: AuthUserInput) {
    const user = this.usersRepository.create(createUserInput);

    return await this.usersRepository.save(user);
  }

  async findAll(email: string) {
    return await this.usersRepository.find({ email });
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne(id);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
